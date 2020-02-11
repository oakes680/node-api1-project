import React, {useState} from "react";
import axios from 'axios'

const EditForm = (props) => {

    const [info, setInfo] = useState({
        name: "",
        bio: ""
      });
    
      const handleChanges = e => {
        setInfo({
          ...info,
          [e.target.name]: e.target.value
        });
      };
      // console.log(info)
      const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:8888/api/users/${props.id}`, info).then(response => {
          console.log(response);
          props.setUpdate(!props.update);
        });
        setInfo({
          name: "",
          bio: ""
        });
      };
    
    
    
      
    console.log('form edit id', props.id)
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="NAME"
        onChange={handleChanges}
        value={info.name}
      />
      <textarea
        type="text-area"
        name="bio"
        placeholder="BIO"
        onChange={handleChanges}
        value={info.bio}
      />

<button type="submit">Submit</button>
    </form>
  );
};

export default EditForm;
