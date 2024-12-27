import React from 'react'
import DonutChart from './PieChart'
import LineChart from './LineChart'

const Stats = () => {
  return (
    <div className='w-full h-full pl-12 pr-6 pt-12 pb-3 flex flex-col gap-12 bg-[#17181E]'>
        <LineChart></LineChart>
    </div>
  )
}

export default Stats