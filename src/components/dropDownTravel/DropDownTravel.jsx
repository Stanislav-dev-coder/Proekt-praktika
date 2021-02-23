import React, { useContext, useState } from 'react';
import List from './List'
import ListItem from './ListItem'
import DropDown from './DropDown'
import DropDownItem from './DropDownItem';
import Context from './Context';

const DropDownTravel = (props) => {
  
  const [countryList, setCountryList] = useState(true)
  const [test, setTest] = useState()
  

  const regions = (
    [
      {
        title: 'Турция',
        price: ' от 36 524 ₽',
        popular: true
      },
      {
        title: 'Россия',
        price: ' от 51 085 ₽',
        popular: true
      },
      {
        title: 'Доминикана',
        price: ' от 106 741 ₽',
        popular: false
      }
    ]
  )

  const city = (
    [
      {
        country: 'Турция',
        title: 'Анталия',
        price: ' от 38 451 ₽',
        popular: true,
        checked: false
      },
      {
        country: 'Турция',
        title: 'Кемер',
        price: ' от 42 674 ₽',
        popular: false,
        checked: false
      },
      {
        country: 'Россия',
        title: 'Москва',
        price: ' от 38 451 ₽',
        popular: true,
        checked: false
      },
      {
        country: 'Россия',
        title: 'Пермь',
        price: ' от 42 674 ₽',
        popular: false,
        checked: false
      },

    ]
  )

  function handleClick(){
    setCountryList(!countryList)
  }

  return(
    <Context.Provider value={{handleClick}}>

      <ListItem title="Страна, курорт или отель">
      {countryList ? 
            (
        <DropDown>
        <span> <b>Популярные направления</b> </span>
        {
          regions.map((region) => {
            if (region.popular === true) {
              return(
                <DropDownItem 
                  title={region.title}
                  price={region.price}
                />
              )
              
            } 
          })
        }
        <span> <b>Остальные направления</b> </span>
        {
          regions.map((region) => {
            if (region.popular !== true) {
              return(
                <DropDownItem 
                  title={region.title}
                  price={region.price}
                />
              )
            } 
          })
        }
        </DropDown>
            ) : (
        <DropDown>
        <span> <b>Популярные направления</b> </span>
        {
          city.map((city) => {
            if ((city.popular === true) && (city.country === 'Россия')) {
              return(
                <DropDownItem 
                  title={city.title}
                  price={city.price}
                />
              )
            } 
          })
        }
        <span> <b>Остальные направления</b> </span>
        {
          city.map((city) => {
            if ((city.popular !== true) && (city.country === 'Россия')) {
              return(
                <DropDownItem 
                  title={city.title}
                  price={city.price}
                />
              )
            } 
          })
        }
        </DropDown>
            )
          }

      </ListItem>
      

    </Context.Provider>
  )
}

export default DropDownTravel