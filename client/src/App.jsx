import { useEffect, useState } from 'react'
import axios from 'axios';
import style from './App.module.css'
import deleteImg from './assets/images/delete.svg';
import editImg from './assets/images/edit.svg';
import defaultImg from './assets/images/defaultPage.svg';

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescription] = useState('');

  //for modalForm
  const [flag, setFlag] = useState(false);
  const [currentId, setCurrentId] = useState(null)
  const [titleModal, setTitleModal] = useState('');
  const [descModal, setDescModal] = useState('');

  //get all tasks
  async function getDate() {
    try {
      const result = await axios.get('http://localhost:3000/tasks');
      console.log(result);
      setTasks(result.data);
    } catch (error) {
      console.log(error.message);

    };
  };

  //create tasks
  async function create() {
    try {
      const result = await axios.post('http://localhost:3000/tasks', {
        title: titleInput,
        description: descriptionInput,
        completed: false,
        created_at: "2024-01-25T11:30:00.000Z",
      });
      setTitleInput('');
      setDescription('');

      console.log(result);
      getDate();

    } catch (error) {
      console.log(error.message);

    };
  };

  //completed
async function toggleComplete(id, currentStatus) {
  try {
    const task = tasks.find(task => task.id === id);
    if (!task) {
      console.log('not found task');
      return;
    }

    const response = await axios.put(`http://localhost:3000/tasks/${id}`, {
      title: task.title,
      description: task.description,
      completed: !currentStatus,
      created_at: "2024-01-25T11:30:00.000Z",
    });
    
    console.log(response.data);
    getDate(); 
  } catch (error) {
    console.log(error.message);
  }
}

  //delete task
  async function deleteEl(id) {
    try {
      const result = await axios.delete(`http://localhost:3000/tasks/${id}`)
      console.log(result);
      getDate();
    } catch (error) {
      console.log(error.message);
    };
  };

  //open ModalForm
  function showModal(task) {
    setCurrentId(task.id);
    setTitleModal(task.title);
    setDescModal(task.description);
    setFlag(true);
  };

  async function update() {
    try {
      await axios.put(`http://localhost:3000/tasks/${currentId}`, {
        title: titleModal,
        description: descModal,
        completed: false,
        created_at: "2024-01-25T11:30:00.000Z",
      });
      setFlag(false);
      setCurrentId(null);
      setTitleModal('');
      setDescModal('');
      getDate();
    } catch (error) {
      console.log(error.message);
    };
  };

  //close modalForm
  function closeModal() {
    setFlag(false);
    setCurrentId(null);
    setTitleModal('');
    setDescModal('');
  }

  useEffect(() => {
    getDate();
  }, []);

  return (
    <div className={style.app}>
      <p className={style.textH}>TODO LIST</p>

      <div className={style.divInput}>
        <input className={style.inpName}
          placeholder='Create note...'
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}>
        </input>
        <input className={style.inpDescription}
          placeholder='Create description note...'
          value={descriptionInput}
          onChange={(e) => setDescription(e.target.value)}>
        </input>
        <button className={style.btn} onClick={create}>create</button>
      </div>
      {/* task list */}
      <div className={style.tasksList}>
        {tasks.length === 0 ? (
          <div className={style.emptyState}>
            <div className={style.emptyIcon}><img src={defaultImg} alt="" /></div>
            <p className={style.emptyTitle}>Empty...</p>
          </div>
        ) : (
          tasks.map((el) => (
            <div key={el.id} className={style.taskWrapper}>
              <div className={style.divTask}>
                <div className={style.taskContent}>
                  <input type="checkbox"
                    className={style.checkbox}
                    checked={el.completed || false}
                    onChange={() => toggleComplete(el.id, el.completed)}/>
                  <p className={`${style.titleText} ${el.completed ? style.completedText : ''}`}>{el.title}</p>
                  <p className={style.descriptionText}>{el.description}</p>
                </div>
                <div className={style.taskActions}>
                  <img
                    src={editImg}
                    alt="Редактировать"
                    onClick={() => showModal(el)}
                    className={style.actionIcon}
                  />
                  <img
                    src={deleteImg}
                    alt="Удалить"
                    onClick={() => deleteEl(el.id)}
                    className={style.actionIcon}
                  />
                </div>
              </div>
              <hr className={style.divider} />
            </div>
          ))
        )};
      </div>
      {/* modal form */}
      {flag && (
        <div className={style.modalOverlay} onClick={closeModal}>
          <div className={style.modalForm} onClick={(e) => e.stopPropagation()}>
            <div className={style.modalHeader}>
              <h3 className={style.modalTitle}>UPDATE NOTE</h3>
            </div>
            <div className={style.modalBody}>
              <input
                type="text"
                className={style.modalInput}
                placeholder='Input your note...'
                value={titleModal}
                onChange={(e) => setTitleModal(e.target.value)}
              />
              <input
                type="text"
                className={style.modalInput}
                placeholder='Input your description note...'
                value={descModal}
                onChange={(e) => setDescModal(e.target.value)}
              />
            </div>
            <div className={style.modalFooter}>
              <button
                className={`${style.modalBtn} ${style.cancelBtn}`}
                onClick={closeModal}
              >
                CANCEL
              </button>
              <button
                className={`${style.modalBtn} ${style.applyBtn}`}
                onClick={update}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;