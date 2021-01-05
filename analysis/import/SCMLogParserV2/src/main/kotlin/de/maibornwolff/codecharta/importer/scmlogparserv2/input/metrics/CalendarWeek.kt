package de.maibornwolff.codecharta.importer.scmlogparserv2.input.metrics

import java.time.OffsetDateTime
import java.time.temporal.ChronoUnit
import java.time.temporal.WeekFields

internal data class CalendarWeek(private val week: Int, private val year: Int) : Comparable<CalendarWeek> {

    override fun compareTo(other: CalendarWeek): Int {
        return numberOfWeeksBetween(this, other)
    }

    companion object {

        fun forDateTime(dateTime: OffsetDateTime): CalendarWeek {
            val week = dateTime.get(WeekFields.ISO.weekOfWeekBasedYear())
            var year = dateTime.year
            year = modifyYear(dateTime, week, year)
            return CalendarWeek(week, year)
        }

        fun numberOfWeeksBetween(a: CalendarWeek, b: CalendarWeek): Int {
            return ChronoUnit.WEEKS.between(getWeekDate(a.year,a.week),getWeekDate(b.year,b.week) ).toInt()
        }

        private fun getWeekDate(year: Int, week: Int): OffsetDateTime? {
            return OffsetDateTime.now().withYear(year)
                    .with(WeekFields.ISO.weekOfYear(), week.toLong())
                    .with(WeekFields.ISO.dayOfWeek(), 1)
        }

        private fun modifyYear(dateTime: OffsetDateTime, week: Int, initialYear: Int): Int {
            var year = initialYear
            if (isFirstOrSecondWeek(week)) {
                if (dayIsOneOfTheLastSevenDaysInYear(dateTime)) {
                    year += 1
                }
            } else if (dayIsOneOfTheFirstSevenDaysOfTheYear(dateTime)) {
                year -= 1
            }

            return year
        }
        private fun dayIsOneOfTheFirstSevenDaysOfTheYear(dateTime: OffsetDateTime): Boolean {
            return dateTime.dayOfYear < 7
        }

        private fun isFirstOrSecondWeek(weekNumber: Int): Boolean {
            return weekNumber <= 2
        }

        private fun dayIsOneOfTheLastSevenDaysInYear(dateTime: OffsetDateTime): Boolean {
            return dateTime.dayOfYear > 358
        }
    }
}
