import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCodeMapper, TMonths } from "./AcademicSemester.interface"

export const Months: TMonths[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export const AcademicSemesterName:TAcademicSemesterName[]=[
    'Autumn','Summar' , 'Fall'
]
export const AcademicSemesterCode:TAcademicSemesterCode[]=[
    '01','02','03'
]


export const AcademicSemesterNameCodeMapper:TAcademicSemesterNameCodeMapper={
    Autumn:'01',
    Summer:'02',
    Fall:'03',

}
