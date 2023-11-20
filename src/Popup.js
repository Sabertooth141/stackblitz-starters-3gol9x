import * as React from 'react';
import './style.css';
import toastr from 'toastr';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Popup = ({
  open,
  setOpen,
  info,
  setInfo,
  isEdit,
  setIsEdit,
  inputData,
  setInputData,
  index,
  setIndex,
}) => {
  let { title, description, deadline, priority } = inputData;

  const [titles, setTitles] = useState([]);
  const [validated, setValidated] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  function handleClose() {
    clearOptions();
    setInputData({ title: '', description: '', deadline: '' });
    setOpen(false);
  }

  function update(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  function handleUpdate() {
    console.log(inputData);
    const newInfo = [...info];
    newInfo.splice(index, 1, inputData);
    console.log(newInfo);
    setInfo(newInfo);
    setIsEdit(false);
    toastr.success('Task Successfully Updated');
    handleClose();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const validationResult = validate(inputData);

    setValidated(true);
    if (form.checkValidity() && validationResult.isValid) {
      setTitles((prevTitles) => [...prevTitles, inputData.title]);
      setInfo((prevInfo) => [...prevInfo, { ...inputData, isComplete: false }]);
      setInputData({ title: '', description: '', deadline: '' });
      clearOptions();
      handleClose();
      toastr.success('Task Successfully Added');
    } else {
      setValidationErrors(validationResult.errors);
      event.stopPropagation();
    }
  }

  function clearOptions() {
    document.getElementById('lowButton').checked = false;
    document.getElementById('medButton').checked = false;
    document.getElementById('highButton').checked = false;
    setValidated(false);
  }

  function validate(data) {
    let err = {};

    if (!data.title || data.title.trim() === '') {
      err.title = 'title required';
    }
    if (!data.description || data.title.trim() === '') {
      err.title = 'desc required';
    }
    if (!data.deadline || data.title.trim() === '') {
      err.title = 'deadline required';
    }
    if (titles.includes(data.title) && !isEdit) {
      err.duplicateTitle = 'This title has already been used!';
    }
    if (!data.priority || data.priority.trim() === '') {
      err.priority = 'Priority is required!';
    }

    return { isValid: Object.keys(err).length === 0, errors: err };
  }

  return (
    <div>
      <Modal show={open} onHide={handleClose} centered className="custom-modal">
        <Modal.Header style={{ backgroundColor: '#1a5ac9' }}>
          {!isEdit ? (
            <Modal.Title style={{ color: 'white' }}>
              <h5>
                <i className="fas fa-plus-circle"></i> Add Task
              </h5>
            </Modal.Title>
          ) : (
            <Modal.Title style={{ color: 'white' }}>
              <h5>
                <i className="fas fa-edit"></i> Edit Task
              </h5>
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              {!isEdit && (
                <Form.Control
                  name="title"
                  type="text"
                  id="titleInput"
                  placeholder="Title"
                  autoFocus
                  onChange={update}
                  value={inputData.title}
                  required
                ></Form.Control>
              )}
              {validationErrors.duplicateTitle && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: 'block' }}
                >
                  {validationErrors.duplicateTitle}
                </Form.Control.Feedback>
              )}
              <Form.Control.Feedback type="invalid">
                Title is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              {!isEdit ? (
                <Form.Control
                  name="description"
                  type="text"
                  id="descInput"
                  placeholder="Description"
                  value={inputData.description}
                  onChange={update}
                  required
                ></Form.Control>
              ) : (
                <label for="descInput" className="has-float-label">
                  <span>Description</span>
                  <Form.Control
                    name="description"
                    type="text"
                    id="descInput"
                    placeholder="Description"
                    value={inputData.description}
                    onChange={update}
                    required
                  ></Form.Control>
                </label>
              )}
              <Form.Control.Feedback type="invalid">
                Description is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <label for="deadlineInput" className="has-float-label">
                <Form.Control
                  name="deadline"
                  type="date"
                  id="deadlineInput"
                  value={inputData.deadline}
                  onChange={update}
                  required
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Deadline is required!
                </Form.Control.Feedback>
                <span>Deadline</span>
              </label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Prority</Form.Label>
              <div key={'default-radio'} className="mb-3">
                <Form.Check
                  inline
                  type="radio"
                  id="lowButton"
                  label="Low"
                  name="priority"
                  value="Low"
                  onChange={update}
                  required
                ></Form.Check>
                <Form.Check
                  inline
                  type="radio"
                  id="medButton"
                  label="Med"
                  value="Med"
                  name="priority"
                  onChange={update}
                  required
                ></Form.Check>
                <Form.Check
                  inline
                  type="radio"
                  id="highButton"
                  label="High"
                  value="High"
                  name="priority"
                  onChange={update}
                  required
                ></Form.Check>
              </div>
              {validationErrors.priority && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: 'block' }}
                >
                  {validationErrors.priority}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={!isEdit ? handleSubmit : handleUpdate}
            size="sm"
          >
            {!isEdit ? (
              <div>
                <i className="fas fa-plus-circle"></i> ADD
              </div>
            ) : (
              <div>
                <i className="fas fa-edit"></i> EDIT
              </div>
            )}
          </Button>
          <Button variant="danger" onClick={handleClose} size="sm">
            <i className="fas fa-ban"></i> CANCEL
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Popup;
