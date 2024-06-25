'use client';
import React, { useState } from 'react';
import Header from "./header";
import Footer from "./footer";
import DropDownComponent from "./drop-down-component";
import data from '../app/data/database.json';
import { Card, CardBody } from "@nextui-org/react";
import BarchartComponent from './barchart-component';

export default function Home() {

  function caseInsensitiveComarision (string1: string, string2: string) {
    return string1.toLowerCase() === string2.toLowerCase();
  }

  const [season, setSeason] = useState('');
  const [level, setLevel] = useState('');
  const [passe, setPasse] = useState('');

  const filterData = (searchParams) => {
    const answer = data.filter(item => {
      return !searchParams.season || searchParams.season === "Toutes" || caseInsensitiveComarision(item.saison, searchParams.season);
    })
    .filter(item => {
      return !searchParams.level || searchParams.level === "Tous" || caseInsensitiveComarision(item.niveau, searchParams.level);
    })
    .filter(item => {
      return !searchParams.passe || searchParams.passe === "Tous" || caseInsensitiveComarision(item.passe, searchParams.passe);
    });
  
    return answer;
  } 

  const findPriceAverage = (searchParams) => {
    const filteredData = filterData(searchParams);
    return filteredData.length !== 0 ? Math.round(filteredData.reduce((acc, item) => acc + item.prix, 0) / filteredData.length) : 0;
  };

  const searchParams = { season, level, passe };
  const filteredData = filterData(searchParams);
  const price = findPriceAverage(searchParams);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header></Header>
      <div className='dash-component-container'>
        <div className='flex-row drop-down-bar'>
          <DropDownComponent
            dropDownTitle="Saisons"
            dropDownElements={["Toutes", "Automne", "Hiver", "Été", "Printemps"]}
            selectedKey={season}
            onSelectionChange= {setSeason}
          />


          <DropDownComponent
            dropDownTitle="Niveau"
            dropDownElements={["Tous", "Novice", "Moyen", "Pro"]}
            selectedKey={level}
            onSelectionChange={setLevel}
          />

          <DropDownComponent
            dropDownTitle="Passe"
            dropDownElements={["Tous", "Simple", "Double", "Illimité"]}
            selectedKey={passe}
            onSelectionChange={setPasse}
          />
        </div>
        <div className='price-card'>
          <Card className='price-card'>
            <CardBody className="price-bard-body">
              <p>Le prix moyen considérant les paramètres choisi est de :</p>
              <p>{price}$</p>
            </CardBody>
          </Card>   
        </div>     
        
        <div className='space-between barchart-container'>
          <BarchartComponent  data={filteredData} parameter="saison"/>    
      
          <BarchartComponent data={filteredData} parameter="niveau"/>
      
          <BarchartComponent data={filteredData} parameter="age"/>
        </div>
      </div>
      <Footer></Footer>
    </main>
  );
}
