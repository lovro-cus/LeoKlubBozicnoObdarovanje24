import supabase from "../config/supabaseClient"
import { Link } from 'react-router-dom';

const Home = () => {
  console.log(supabase)

  return (
    <div className="page home">
      <h2>Božično obdarvanje</h2>
      <p>Smo Leo klub Ptuj, zdaj že (leto) odbarujemo otroke in z veseljem pomagamo narisati nasmehe v božičnem času, če nam želiš pomagat obdarit čim več otrok tudi ti, klikni na ta         
        <Link to="/page/wishes" style={{ textDecoration: 'none', color: 'blue', marginLeft: '5px' }}>
          link
        </Link> in obdari otroka.</p>
      <p>Želiš letos postati božiček?</p>
      <p>-malo opis o nasem delu-</p>
    </div>
  )
}

export default Home
