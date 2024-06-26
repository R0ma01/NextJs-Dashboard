'use client';
import React, { useState } from 'react';
import Footer from "./footer";
import DropDownComponent from "./drop-down-component";
import data from '../app/data/database.json';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import BarchartComponent from './barchart-component';
import { SearchParams } from './interface';

export default function Home() {

  function caseInsensitiveCompare (string1: string, string2: string) {
    return string1.toLowerCase() === string2.toLowerCase();
  }

  const [season, setSeason] = useState('');
  const [level, setLevel] = useState('');
  const [passe, setPasse] = useState('');

  const filterData = (searchParams: SearchParams) => {
    const answer = data.filter(item => {
      return !searchParams.season || searchParams.season === "Toutes" || caseInsensitiveCompare(item.saison, searchParams.season);
    })
    .filter(item => {
      return !searchParams.level || searchParams.level === "Tous" || caseInsensitiveCompare(item.niveau, searchParams.level);
    })
    .filter(item => {
      return !searchParams.passe || searchParams.passe === "Toutes" || caseInsensitiveCompare(item.passe, searchParams.passe);
    });
  
    return answer;
  } 

  const findPriceAverage = (searchParams: SearchParams) => {
    const filteredData = filterData(searchParams);
    return filteredData.length !== 0 ? Math.round(filteredData.reduce((acc, item) => acc + item.prix, 0) / filteredData.length) : 0;
  };

  const searchParams: SearchParams = { season, level, passe };
  const filteredData = filterData(searchParams);
  const price = findPriceAverage(searchParams);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Paramètre 1</li>
            <li>Paramètre 2</li>
            <li>ETC.</li>
          </ul>
        </nav>
        <footer>
          <p>Sidebar Footer</p>
        </footer>
      </div>
      <div className="main-content">
        <div className="content">
          <div className='dash-component-container'>
            <Card className='drop-down-bar'>
              <CardHeader>Paramètres</CardHeader>
              <CardBody>
              <div className='flex-row drop-down-bar'>
                <DropDownComponent
                dropDownTitle="Saison"
                dropDownElements={["Toutes", "Automne", "Hiver", "Été", "Printemps"]}
                selectedKey={season}
                onSelectionChange={setSeason}
                />
                <DropDownComponent
                  dropDownTitle="Niveau"
                  dropDownElements={["Tous", "Novice", "Moyen", "Pro"]}
                  selectedKey={level}
                  onSelectionChange={setLevel}
                />
                <DropDownComponent
                  dropDownTitle="Passe"
                  dropDownElements={["Toutes", "Simple", "Double", "Illimité"]}
                  selectedKey={passe}
                  onSelectionChange={setPasse}
                />
              </div>
                </CardBody>
              </Card>              
            
            <div className='price-card'>
              <Card className='price-card'>
                <CardBody>
                  <p>Le prix moyen considérant les paramètres choisi est de :</p>
                  <p className='price'>{price}$</p>
                </CardBody>
              </Card>
            </div>
            <div className='barchart-container'>
              <BarchartComponent data={filteredData} parameter="saison" />
              <BarchartComponent data={filteredData} parameter="niveau" />
              <BarchartComponent data={filteredData} parameter="age" />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
}
