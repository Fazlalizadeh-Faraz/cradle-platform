from Database.PatientRepository import PatientRepository
from config import db
from models import PatientSchema, Patient


class PatientRepositoryMysql(PatientRepository):
    def __init__(self):
        pass

    @staticmethod
    def model_to_dict(model):
        return PatientSchema().dump(model)

    def add_new_patient(self, patient_data):
        """Creates a new patient.

        :param patient_data:
        :return: Patient data as a SQLAlchemy Model object, Call .as_dict() to convert.
        """
        # Add a new patient to db
        schema = PatientSchema()
        new_patient = schema.load(patient_data, session=db.session)

        db.session.add(new_patient)
        db.session.commit()

        # Return the newly created patient
        return new_patient

    def get(self, patient_id):
        patient = Patient.query.filter_by(patientId=patient_id).one_or_none()
        if patient:
            return patient
        return None

    def get_all(self):
        patients = Patient.query.all()
        if patients:
            return patients
        return None

    @staticmethod
    def delete_all():
        count = db.session.query(Patient).delete()
        db.session.commit()
        print("Deleted", count, "patients")
