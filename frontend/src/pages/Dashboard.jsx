import SearchBar from '../components/SearchBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(()=> {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <section className="heading">
        <h5>Welcome, {user && user.name}!</h5>
      </section>
      <SearchBar />
    </>
  )
}

export default Dashboard