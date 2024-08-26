import React from 'react';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { IoChevronDown } from 'react-icons/io5';

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <div className='icon'>
          <IoChevronDown />
        </div>
      </>
    }
  />
);

function AccorditionHome() {
  const options = [
    {
      title: 'Γιατί να επιλέξετε την ενοικίαση αυτοκινήτου CarShare',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Γιατί να επιλέξετε την ενοικίαση αυτοκινήτου CarShare',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Γιατί να επιλέξετε την ενοικίαση αυτοκινήτου CarShare',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Γιατί να επιλέξετε την ενοικίαση αυτοκινήτου CarShare',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];
  return (
    <Accordion transition transitionTimeout={250}>
      {options.map((option, index) => (
        <AccordionItem header={option.title} key={index}>
          {option.text}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccorditionHome;
