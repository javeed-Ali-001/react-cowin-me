import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7dayData} = props

  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="container">
      <h1 className="heading">Vaccination Coverage</h1>
      <BarChart width={900} height={400} data={last7dayData}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.5,
            fontFamily: 'Roboto',
            fontSize: 15,
          }}
        />
        <Bar
          dataKey="dose1"
          name="dose 1"
          radius={[5, 5, 0, 0]}
          fill="#5a8dee"
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="dose 2"
          radius={[5, 5, 0, 0]}
          fill=" #f54394"
          barSize="20%"
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
