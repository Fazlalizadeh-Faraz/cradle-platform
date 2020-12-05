export enum ReadingField {
  // symptoms
  headache = 'headache',
  blurredVision = 'blurredVision',
  abdominalPain = 'abdominalPain',
  bleeding = 'bleeding',
  feverish = 'feverish',
  unwell = 'unwell',
  cough = 'cough',
  shortnessOfBreath = 'shortnessOfBreath',
  soreThroat = 'soreThroat',
  muscleAche = 'muscleAche',
  fatigue = 'fatigue',
  lossOfSense = 'lossOfSense',
  lossOfTaste = 'lossOfTaste',
  lossOfSmell = 'lossOfSmell',
  otherSymptoms = 'otherSymptoms',
  // vital signs
  bpSystolic = 'bpSystolic',
  bpDiastolic = 'bpDiastolic',
  heartRateBPM = 'heartRateBPM',
  respiratoryRate = 'respiratoryRate',
  oxygenSaturation = 'oxygenSaturation',
  temperature = 'temperature',
  // urine test
  urineTest = 'urineTest',
  leukocytes = 'leukocytes',
  nitrites = 'nitrites',
  glucose = 'glucose',
  protein = 'protein',
  blood = 'blood',
  // assessment
  investigation = 'investigation',
  finalDiagnosis = 'finalDiagnosis',
  treatment = 'treatment',
  medication = 'medication',
  followUp = 'followUp',
  followUpInstruc = 'followUpInstruc',
}

export const initialState = {
  // symptoms
  [ReadingField.headache]: false,
  [ReadingField.blurredVision]: false,
  [ReadingField.abdominalPain]: false,
  [ReadingField.bleeding]: false,
  [ReadingField.feverish]: false,
  [ReadingField.unwell]: false,
  [ReadingField.cough]: false,
  [ReadingField.shortnessOfBreath]: false,
  [ReadingField.soreThroat]: false,
  [ReadingField.muscleAche]: false,
  [ReadingField.fatigue]: false,
  [ReadingField.lossOfSense]: false,
  [ReadingField.lossOfTaste]: false,
  [ReadingField.lossOfSmell]: false,
  [ReadingField.otherSymptoms]: '',
  // vital signs
  [ReadingField.bpSystolic]: '',
  [ReadingField.bpDiastolic]: '',
  [ReadingField.heartRateBPM]: '',
  [ReadingField.respiratoryRate]: '',
  [ReadingField.oxygenSaturation]: '',
  [ReadingField.temperature]: '',
  // urine test
  [ReadingField.urineTest]: false,
  [ReadingField.leukocytes]: '',
  [ReadingField.nitrites]: '',
  [ReadingField.glucose]: '',
  [ReadingField.protein]: '',
  [ReadingField.blood]: '',
  // assessment
  [ReadingField.investigation]: '',
  [ReadingField.finalDiagnosis]: '',
  [ReadingField.treatment]: '',
  [ReadingField.medication]: '',
  [ReadingField.followUp]: false,
  [ReadingField.followUpInstruc]: '',
};

export type ReadingState = typeof initialState;

export interface FormPageProps {
  values: ReadingState 
};