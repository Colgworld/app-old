import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

// import moment from 'moment';
// import 'moment-range';

import Feather from 'react-native-vector-icons/Feather'
import globalStyles from 'App/Themes/GlobalStyles'
import { Col, Row, Grid } from 'react-native-easy-grid';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import Colors from 'App/Themes/Colors'

type DatesType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  onDatesChange: (date: { date?: ?moment, startDate?: ?moment, endDate?: ?moment }) => void,
  isDateBlocked: (date: moment) => boolean,
  onDisableClicked: (date: moment) => void
}

type YearType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  currentDate: moment,
  focusedMonth: moment,
  onDatesChange: (date: { date?: ?moment, startDate?: ?moment, endDate?: ?moment }) => void,
  isDateBlocked: (date: moment) => boolean,
  onDisableClicked: (date: moment) => void
}

type MonthType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  currentDate: moment,
  focusedMonth: moment,
  onDatesChange: (date: { date?: ?moment, startDate?: ?moment, endDate?: ?moment }) => void,
  isDateBlocked: (date: moment) => boolean,
  onDisableClicked: (date: moment) => void
}

type WeekType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  startOfWeek: moment,
  onDatesChange: (date: { date?: ?moment, startDate?: ?moment, endDate?: ?moment }) => void,
  isDateBlocked: (date: moment) => boolean,
  onDisableClicked: (date: moment) => void
}

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  month: {
    paddingTop: 20
  },
  week: {
    flexDirection: 'row'
  },
  dayName: {
    flexGrow: 1,
    flexBasis: 1,
    textAlign: 'center',
  },
  day: {
    flexGrow: 1,
    flexBasis: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
    margin: 1,
    padding: 10
  },
  dayBlocked: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  daySelected: {
    backgroundColor: Colors.darkPurple
  },
  dayText: {
    color: 'rgb(0, 0, 0)',
    fontWeight: '600'
  },
  dayDisabledText: {
    color: 'gray',
    opacity: 0.5,
    fontWeight: '400'
  },
  daySelectedText: {
    color: 'rgb(252, 252, 252)'
  }
});

const dates = (startDate: ?moment, endDate: ?moment, focusedInput: 'startDate' | 'endDate') => {
  if (focusedInput === 'startDate') {
    if (startDate && endDate) {
      return ({ startDate, endDate: null, focusedInput: 'endDate' });
    }
    return ({ startDate, endDate, focusedInput: 'endDate' });
  }

  if (focusedInput === 'endDate') {
    if (endDate && startDate && endDate.isBefore(startDate)) {
      return ({ startDate: endDate, endDate: null, focusedInput: 'endDate' });
    }
    return ({ startDate, endDate, focusedInput: 'startDate' });
  }

  return ({ startDate, endDate, focusedInput });
};

export const Week = (props: WeekType) => {

  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    startOfWeek,
    onDatesChange,
    isDateBlocked,
    onDisableClicked
  } = props;

  const days = [];

  const eow = moment.range(startOfWeek.clone().startOf('isoweek'), startOfWeek.clone().endOf('isoweek'));

  let week = Array.from(eow.by('days', { step: 1 }));
  week.map((day) => {

    const onPress = () => {
      if (isDateBlocked(day)) {
        onDisableClicked(day);
      } else if (range) {
        let isPeriodBlocked = false;
        const start = focusedInput === 'startDate' ? day : startDate;
        const end = focusedInput === 'endDate' ? day : endDate;
        if (start && end) {
          moment.range(start, end).by('days', (dayPeriod: moment) => {
            if (isDateBlocked(dayPeriod)) isPeriodBlocked = true;
          });
        }
        onDatesChange(isPeriodBlocked ?
          dates(end, null, 'startDate') :
          dates(start, end, focusedInput));
      } else {
        onDatesChange({ date: day });
      }

    };

    const isDateSelected = () => {
      if (range) {
        if (startDate && endDate) {
          return day.isSameOrAfter(startDate) && day.isSameOrBefore(endDate);
        }
        return (startDate && day.isSame(startDate)) || (endDate && day.isSame(endDate));
      }
      return date && day.isSame(date);
    };

    const isBlocked = isDateBlocked(day);
    const isSelected = isDateSelected();



    const style = [
      styles.day,
      isBlocked && styles.dayBlocked,
      isSelected && styles.daySelected
    ];

    const styleText = [
      styles.dayText,
      isBlocked && styles.dayDisabledText,
      isSelected && styles.daySelectedText
    ];

    days.push(
      <TouchableOpacity
        key={day.date()}
        style={style}
        onPress={onPress}
        disabled={isBlocked && !onDisableClicked}
      >
        <Text style={styleText}>{day.date()}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <Row size={10} style={styles.week}>{days}</Row>
  );
};

export const Month = (props: MonthType) => {
  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    currentDate,
    focusedMonth,
    onDatesChange,
    isDateBlocked,
    onDisableClicked
  } = props;

  const dayNames = [];
  const weeks = [];
  const startOfMonth = focusedMonth.clone().startOf('month').startOf('isoweek');
  const endOfMonth = focusedMonth.clone().endOf('month');
  const sixMonths = focusedMonth.clone().endOf('year');
  const weekRange = moment.range(currentDate.clone().startOf('isoweek'), currentDate.clone().endOf('isoweek'));

  let week = Array.from(weekRange.by('day', { step: 1 }));
  week.map((day) => {
    dayNames.push(
        <Col>
        <Text key={day.date()} style={styles.dayName}>
          {day.format('ddd')}
        </Text>
        </Col>
    );
  });


  let wks = Array.from(moment.range(startDate, endDate).by('week'));
  wks.map((w, k) => {
    weeks.push(
      <Week
        key={k}
        range={range}
        date={date}
        startDate={startDate}
        endDate={endDate}
        focusedInput={focusedInput}
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        startOfWeek={w}
        onDatesChange={onDatesChange}
        isDateBlocked={isDateBlocked}
        onDisableClicked={onDisableClicked}
      />
    );
  })
  
  let title = <Text style={globalStyles.H4}>{startDate.format('MMMM YYYY')}</Text>

  return (
    <Grid style={styles.month}>
      <Row>
        <Col>
          <Row size={15}>
            {title}
          </Row>
          <Row size={10} style={styles.week}>
              {dayNames}
          </Row>
          <Row size={75} style={styles.week}>
            <Col>
              {weeks}
            </Col>
          </Row>          
        </Col>
      </Row>
    </Grid>
  );
};

export const Year = (props: YearType) => {
  const {
    range,
    date,
    startDate,
    endDate,
    focusedInput,
    currentDate,
    focusedMonth,
    onDatesChange,
    isDateBlocked,
    onDisableClicked
  } = props;


  let mnths = []
  const startOfMonth = currentDate.clone().startOf('week');
  const endOfYear = focusedMonth.clone().endOf('year');


  let months = Array.from(moment.range(startOfMonth, endOfYear).by('month'));
  months.map((w, k) => {
    
    const startOfMonth = w.clone().startOf('month');
    const endOfMonth = w.clone().endOf('month');
    mnths.push(
      <Month
        key={k}
        range={range}
        date={date}
        startDate={startOfMonth}
        endDate={endOfMonth}
        focusedInput={focusedInput}
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        startOfWeek={w}
        onDatesChange={onDatesChange}
        isDateBlocked={isDateBlocked}
        onDisableClicked={onDisableClicked}
      />
    );
  })
  

  return (
    <View style={styles.month}>
      {mnths}
    </View>
  );
};

export default class Dates extends Component {
  state = {
    currentDate: moment(),
    focusedMonth: moment().startOf('month'),
  }
  props: DatesType;

  render() {

    const previousMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(-1, 'M') });
    };

    const nextMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(1, 'M') });
    };

    return (
      <Grid>
        <Row>
          <Col>
            <Year
              range={this.props.range}
              date={this.props.date}
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              focusedInput={this.props.focusedInput}
              currentDate={this.state.currentDate}
              focusedMonth={this.state.focusedMonth}
              onDatesChange={this.props.onDatesChange}
              isDateBlocked={this.props.isDateBlocked}
              onDisableClicked={this.props.onDisableClicked}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
