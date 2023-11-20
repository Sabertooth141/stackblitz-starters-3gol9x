import { FC } from 'react';
import * as React from 'react';
import './style.css';
import Form from './Form';
import Popup from './Popup';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <Form />
      {/* <Popup open={true} /> */}
    </div>
  );
};
