from flask_restful import abort
from datetime import datetime, date
from manager.Manager import Manager
from manager.ReadingManagerNew import ReadingManager  # reading data
from manager import patientManager
import json

readingManager = ReadingManager()


class PatientStatsManager:

    TRAFFIC_LIGHT_STAT = "trafficLightStatus"

    def get_traffic_light(self, item, data):
        yellow_up_index = 1
        yellow_down_index = 2
        red_up_index = 3
        red_down_index = 4
        green_index = 0

        ## Refactor using above dict
        if item[TRAFFIC_LIGHT_STAT] == "YELLOW_UP":
            data[yellow_up_index] += 1
        if item[TRAFFIC_LIGHT_STAT] == "YELLOW_DOWN":
            data[yellow_down_index] += 1
        if item[TRAFFIC_LIGHT_STAT] == "RED_UP":
            data[red_up_index] += 1
        if item[TRAFFIC_LIGHT_STAT] == "RED_DOWN":
            data[red_down_index] += 1
        if item[TRAFFIC_LIGHT_STAT] == "GREEN":
            data[green_index] += 1

    """
    Description: Returns a 2D list containing requested data 
        ex. bpSystolic readings, seperated by month
    Parameters:
        dataNeeded: The data that needs to be collected
        ex. bpSystolic, bpDiastolic, heartRate, trafficLightStatus
    """

    def get_data(self, dataNeeded, table, patient_id):

        if dataNeeded == TRAFFIC_LIGHT_STAT:
            data = [0, 0, 0, 0, 0]
        else:
            data = [[], [], [], [], [], [], [], [], [], [], [], []]

        for item in table:
            if patient_id == item["patientId"]:
                if dataNeeded == TRAFFIC_LIGHT_STAT:
                    # do traffic light status stuff here
                    self.get_traffic_light(item, data)
                else:
                    date_unix_ts = item["dateTimeTaken"]
                    date_object = date.fromtimestamp(date_unix_ts)
                    item_month = date_object.month
                    item_year = date_object.year
                    current_year = date.today().year
                    if current_year == item_year:
                        data[item_month - 1].append(item[dataNeeded])

        return data

    def clean_up_data(self, data_to_clean):
        for item in data_to_clean:
            if len(item) == 0:
                item.append("No readings for this month")

    """
    Description: Puts together a json object containing stats about the following:
        - bpSystolic
        - bpDiastolic
        - heartRate
        - trafficLightStatus
    """

    def put_data_together(self, patient_id):

        patient = patientManager.read("patientId", patient_id)
        if patient is None:
            abort(404, message="Patient {} doesn't exist.".format(patient_id))

        readings = readingManager.read_all()

        # getting all bpSystolic readings for each month
        bp_systolic = self.get_data("bpSystolic", readings, patient_id)

        # getting all bpDiastolic readings for each month
        bp_diastolic = self.get_data("bpDiastolic", readings, patient_id)

        # getting all heart rate readings for each month
        heart_rate = self.get_data("heartRateBPM", readings, patient_id)

        # getting all traffic lights from day 1 for this patient
        traffic_light_statuses = self.get_data(TRAFFIC_LIGHT_STAT, readings, patient_id)

        # putting data into one object now
        data = {
            "bpSystolicReadingsMonthly": bp_systolic,
            "bpDiastolicReadingsMonthly": bp_diastolic,
            "heartRateReadingsMonthly": heart_rate,
            "trafficLightCountsFromDay1": {
                "green": traffic_light_statuses[0],  # dont
                "yellowUp": traffic_light_statuses[1],  # hate
                "yellowDown": traffic_light_statuses[2],  # the
                "redUp": traffic_light_statuses[3],  # magic
                "redDown": traffic_light_statuses[4],  # numbers
            },
        }

        # ret
        return data
