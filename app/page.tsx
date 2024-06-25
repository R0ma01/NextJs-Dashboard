'use client';
import React, { useState } from 'react';
import header from "./header";
import footer from "./footer";
import DropDownComponent from "./drop-down-component";
import data from '../app/data/database.json';
import {Card, CardBody} from "@nextui-org/react";
import barchartComponent from './barchart-component';

export default function Home() {
  const [season, setSeason] = useState('Saison');
  const [level, setLevel] = useState('Niveau');
  const [passe, setPasse] = useState('Passe');

  const findPriceAverage = (searchParams: {season: string, level: string, passe: string}) => {
    const filteredData = data.filter((item) =>
      item.saison === searchParams.season &&
      item.niveau === searchParams.level &&
      item.passe === searchParams.passe
    );
    return filteredData.length != 0 ? Math.round(filteredData.reduce((acc, item) => acc + item.prix, 0)/filteredData.length) : 0 ;
  };

  const searchParams = { season, level, passe };
  const price = findPriceAverage(searchParams);
  const pageHeader = header();
  const pageFooter = footer();
  const levelBarchart = barchartComponent(data, 'saison');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {pageHeader}
      </div>
      <div>
        <DropDownComponent 
          dropDownTitle="Saisons" 
          dropDownElements={["Automne", "Hiver", "Été", "Printemps"]}
          selectedKey={season}
          onSelectionChange={setSeason}
        />
      </div>
      <div>
        <DropDownComponent 
          dropDownTitle="Niveau" 
          dropDownElements={["Novice", "Moyen", "Pro"]}
          selectedKey={level}
          onSelectionChange={setLevel}
        />
      </div>
      <div>
        <DropDownComponent 
          dropDownTitle="Passe" 
          dropDownElements={["Simple", "Double", "Illimité"]}
          selectedKey={passe}
          onSelectionChange={setPasse}
        />
      </div>
      <div>
        <div>
          <Card>
            <CardBody>
              <p>{price}</p>
            </CardBody>
          </Card>
        </div>
      </div>
 
      <div>
        {levelBarchart}
      </div>

      <div>
        {pageFooter}
      </div>
    </main>
  );
}
