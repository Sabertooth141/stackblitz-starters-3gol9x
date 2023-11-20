import * as React from 'react';
import $ from 'jquery';
import './style.css';
import toastr from 'toastr';
import { useState } from 'react';
import Popup from './Popup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

toastr.options = {
  positionClass: 'toast-bottom-right',
};

export default function Form() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [index, setIndex] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const [inputData, setInputData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 0,
  });

  function popUp() {
    setOpen(true);
  }

  function handleChange(index) {
    const newInfo = info.map((item, i) => {
      if (i === index) {
        return { ...item, isComplete: !item.isComplete };
      }
      return item;
    });
    setInfo(newInfo);
  }

  function handleUpdate(index) {
    let { title, description, deadline, priority } = info[index];
    setInputData(info[index]);
    setIndex(index);
    setIsEdit(true);
    setOpen(true);
  }

  function handleDelete(index) {
    const newInfo = [...info];
    newInfo.splice(index, 1);
    setInfo(newInfo);
    toastr.success('Task Successfully Deleted');
  }

  return (
    <div>
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: '#1a5ac9' }}
      >
        <div className="container-fluid">
          <div className="navbar-header col-md-10">
            <h1 className="navbar-brand">
              <i className="fas fa-bars"></i> FRAMEWORKS
            </h1>
          </div>
          <div>
            <Button variant="primary" onClick={popUp}>
              <i className="fas fa-plus-circle"></i> ADD
            </Button>
          </div>
        </div>
      </nav>

      <Table>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">Priority</th>
            <th scope="col">Is Complete</th>
            <th scope="col" className="button-column">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {info.map((item, index) => {
            return (
              <tr key={index}>
                <td align="center" className="align-middle">
                  {' '}
                  {item.title}{' '}
                </td>
                <td align="center" className="align-middle">
                  {' '}
                  {item.description}{' '}
                </td>
                <td align="center" className="align-middle">
                  {' '}
                  {item.deadline}{' '}
                </td>
                <td align="center" className="align-middle">
                  {' '}
                  {item.priority}{' '}
                </td>
                <td align="center" className="align-middle">
                  <Form.Check
                    type="checkbox"
                    name="isComplete"
                    id={'isComplete - ${index}'}
                    checked={item.isComplete}
                    onChange={() => {
                      handleChange(index);
                    }}
                  ></Form.Check>
                </td>
                <td align="center" className="align-middle">
                  <div className="d-grid">
                    {!item.isComplete && (
                      <div className="col">
                        <Button
                          variant="primary"
                          onClick={() => handleUpdate(index)}
                          size="sm"
                        >
                          <i className="fas fa-edit"></i>UPDATE
                        </Button>
                      </div>
                    )}
                    <div className="col">
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                        size="sm"
                      >
                        <i className="fas fa-times-circle"></i> DELETE
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Popup
        open={open}
        setOpen={setOpen}
        inputData={inputData}
        setInputData={setInputData}
        info={info}
        setInfo={setInfo}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        index={index}
        setIndex={setIndex}
      />
    </div>
  );
}
