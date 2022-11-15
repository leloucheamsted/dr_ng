class Patient {
    constructor(
                key,
                name,
                gender,
                age,
                code,
                phone,
                address,
                city,
                appointmentDate,
                first_time,
                dateOfRecordEntry,
                status,
                appointment_time,
                note_before,
                note_after) {
        this.key=key;
        this.name=name;
        this.gender=gender;
        this.age=age;
        this.code=code;
        this.phone=phone;
        this.address=address;
        this.city=city;
        this.appointmentDate=appointmentDate;
        this.first_time=first_time;
        this.dateOfRecordEntry=dateOfRecordEntry;
        this.status=status;
        this.appointment_time=appointment_time;
        this.note_before=note_before;
        this.note_after=note_after;

    }
}
export  default Patient;
