export interface Competition {
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
}

export interface CompetitionSubmit {
    name: string,
    startDate: Date,
    endDate: Date,
}