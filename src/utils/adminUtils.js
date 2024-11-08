export const fetchFilteredUsers = async (query)=>{

    const response = await fetch(`http://localhost:5190/api/User/Filtered?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = response.json()
    return users

}

export const fetchDeleteUser = async (id)=>{
    const response = await fetch(`http://localhost:5190/api/User/Delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

}