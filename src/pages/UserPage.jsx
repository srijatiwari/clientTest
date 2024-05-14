import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import User from '../components/User'
const UserPage = () => {
  
  const [searchString, setSearchString] = useState('')
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [natArray, setNatArray] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://assignmentsrija111.vercel.app/users?page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        const natArrayFromData = data?.users?.map(user => user.nat)
        console.log("natArrayFromData", natArrayFromData)
        const uniqueNatArray = Array.from(new Set(natArrayFromData))
        console.log("nnn", natArray)
        setNatArray(uniqueNatArray)
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [page]);


  const handleChange = (event) => {
    setSelectedNationality(event.target.value);
  };

  // Function to filter users based on selected nationality
  const filteredUsers = users.filter(user => {
    const searchMatch = user.name.first.toLowerCase().includes(searchString.toLowerCase());
    const nationalityMatch = selectedNationality === '' || user.nat === selectedNationality;
    return searchMatch && nationalityMatch;
  });
  
  return (
    <div>
      <p className='text-3xl text-center font-bold py-4 text-white'>Filter Users List</p>

      <div className='py-4'>
        <Input setSearchString={setSearchString} searchString={searchString}/>
        <div  className='py-4'>
          {
          
            <select value={selectedNationality} onChange={handleChange}>
              <option value="">Select</option>
              {natArray?.map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          }
          <p className='text-white'>Selected nationality: {selectedNationality}</p>
        </div>
      </div>
      <div className='flex gap-2 px-[20px] flex-wrap py-4 justify-center'>
        {
          filteredUsers?.map((user, index) => {
            return <User key={index} user={user} />
          })
        }
        {
          filteredUsers?.length === 0 && <p className='text-red-900 text-3xl'>No users found</p>
        }
      </div>

      <div className='flex justify-center py-6'>
        <div className='flex gap-2 items-center'>
          <button
            className='disabled:opacity-50 bg-black text-white p-[10px] rounded-md'
            onClick={() => setPage(prevPage => prevPage > 1 ? prevPage - 1 : 1)}>Previous</button>
          <p className='text-white font-bold text-[20px]'>{page}</p>
          <button
            disabled={page === 7}
            className='disabled:opacity-50 bg-black text-white p-[10px] rounded-md'
            onClick={() => setPage(prevPage => prevPage < 7 && prevPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default UserPage