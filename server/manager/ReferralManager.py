from flask_restful import abort

from utils import pprint

from database.ReferralRepo import ReferralRepo
from database.PatientRepoNew import PatientRepo
from database.ReadingRepoNew import ReadingRepo
from database.HealthFacilityRepoNew import HealthFacilityRepo

from models import Patient, HealthFacility, Reading
from validation.ReferralValidator import ReferralValidator

from manager.Manager import Manager

from manager import patientManager, healthFacilityManager
from manager.PatientAssociationsManager import PatientAssociationsManager
from manager.ReadingManagerNew import ReadingManager as ReadingManagerNew

readingManager = ReadingManagerNew()
validator = ReferralValidator()


class ReferralManager(Manager):
    def __init__(self):
        Manager.__init__(self, ReferralRepo)

    def create_referral_with_patient_and_reading(self, req_data, user_id):
        # if the patient is already created, dont create,
        try:
            validator.exists(Patient, "patientId", req_data["patient"]["patientId"])
        except Exception as e:
            print("patient does not exist yet, creating")
            # do validation here
            created_patient = patientManager.create(req_data["patient"])
            print("created_patient: ")
            pprint(created_patient)

        # if the reading already created, dont create,
        # else use the patientId and create new reading
        try:
            validator.exists(Reading, "readingId", req_data["reading"]["readingId"])
        except Exception as e:
            print("reading does not exist yet, creating")
            req_data["reading"]["patientId"] = req_data["patient"]["patientId"]
            created_reading = readingManager.create_reading(req_data["reading"])
            print("created_reading: ")
            pprint(created_reading)

        # if the health facility is created, dont create, else use the
        # healthFacilityName to create a new health facility
        try:
            validator.exists(
                HealthFacility, "healthFacilityName", req_data["healthFacilityName"]
            )
        except Exception as e:
            print("healthFacility doesnt exist, creating")
            created_hf = healthFacilityManager.create(
                {"healthFacilityName": req_data["healthFacilityName"]}
            )
            print("created health facility: ")
            pprint(created_hf)

        # add patient facility relationship
        patient_id = req_data["patient"]["patientId"]
        facility_name = req_data["healthFacilityName"]
        PatientAssociationsManager().associate_by_id(patient_id, facility_name, user_id)

        def build_ref_dict(ref_json):
            ref_dict = {}
            ref_dict["patientId"] = ref_json["patient"]["patientId"]
            ref_dict["readingId"] = ref_json["reading"]["readingId"]
            ref_dict["dateReferred"] = ref_json["date"]
            ref_dict["referralHealthFacilityName"] = ref_json["healthFacilityName"]
            ref_dict["comment"] = ref_json["comment"]
            return ref_dict

        referral_data = build_ref_dict(req_data)

        print("referral_data: ")
        pprint(referral_data)

        # validate new referral
        try:
            validator.enforce_required(referral_data)
            validator.validate(referral_data)
        except Exception as e:
            print(e)
            abort(400, message=str(e))

        created_res = self.create(referral_data)
        return referral_data
