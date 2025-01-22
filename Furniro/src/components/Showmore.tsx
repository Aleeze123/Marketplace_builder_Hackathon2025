import React from 'react'
import Link from 'next/link'
const Showmore = () => {
  return (
    <div className="flex justify-center mt-8">
    <Link href="/Shop" passHref>

  <button className="w-[245px] h-[48px] bg-white border-[1px] border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white">
    Show More
  </button>

</Link>
</div>
  )
}

export default Showmore