import React from 'react';
import BookTable from '../components/table/bookTable';

const Home = () => {
  return (
    <div>
      <h1>IFF-2/1 Vilius Tamašauskas</h1>
      <div className="library-system-description">
        <h2>Bibliotekos sistema</h2>
        <p>Administratorius registruoja bibliotekininkus.</p>
        <p>Bibliotekininkas redaguoja knygų sąrašus ir egz. skaičių.</p>
        <p>Neprisiregistravęs vartotojas mato sąrašus (visų ir nepaimtų).</p>
        <p>
          Prisiregistravęs vartotojas išsirenka norimus iš nepaimtų ir laikom
          kad pasiima knygas po 1 egz.
        </p>
        <p>Bibliotekininkas mato kas ką paėmęs, atžymi grąžinimą.</p>
        <p>--- papildomai:</p>
        <p>
          Įvedam įvykių laikus. Knyga išduodama fiksuotam laikui. Jam artėjant į
          pabaigą, siunčiama žinutė
        </p>
        <p>
          Vartotojui, pas kurį yra laiku negrąžintų knygų, naujos neišduodamos.
        </p>
      </div>
      <BookTable />
    </div>
  );
};

export default Home;