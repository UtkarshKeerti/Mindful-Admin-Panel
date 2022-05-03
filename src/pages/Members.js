import { useEffect, useState } from 'react';

const Members = () => {

  const [membersCard, setMembersCard] = useState([])
  useEffect(() => {
    setMembersCard([])
  }, [])

  return (
    <>
      <h2 className={'pageheading'}>Members</h2>
    </>
  )
}

export default Members
