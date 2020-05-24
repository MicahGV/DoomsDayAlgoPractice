import {get_day_of_week, doomDays} from './doomsday.utils';

test("doomsdayGetDayOfWeek", () => {
    // Arrange
    for (let i = 0; i < 6; i++) {
        const date = new Date(2020,5,3+i)
        const expectedDay = doomDays[date.getDay()].name
        const resultDay = get_day_of_week(date)
        expect(resultDay).toEqual(expectedDay)
    }
})
