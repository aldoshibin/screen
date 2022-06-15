import { useState } from "react";
import { Axios } from "axios";

const Segment=()=> {
    const [schemaList,setSchemaList] = useState([{schema:""}]);
    const [name,setName] =useState('');

    // const options=[
    //     data: ['First name, ']
    // ]
    console.log(schemaList)
    const handleSubmit=(e)=>{
        e.preventDefault();
        Axios.post("https://webhook.site/38714527-f1a9-4c1f-b689-d6cf31eb1b43", {
            segment_name: name,
            schema : schemaList,
        }).then((response) => {
            console.log(response);
          },(error) => {
            console.log(error);
          });

    }

    const handleCancel=() => {
        window.location.reload();
    }
    const handleSchemaChange=(e,index)=>{
        const {name, value} = e.target;
        const list =[...schemaList];
        list[index][name]=value;
        setSchemaList(list);
    };

    const handleSchemaRemove= (index) => {
        const list=[...schemaList];
        list.splice(index,1);
        setSchemaList(list);
    };

    const handleSchemaAdd = () => {
        setSchemaList([...schemaList, {schema:""}]);
    };
    return(
        <>
            <div className='header'>
                <b>Saving Segment</b>
            </div>
            <div className='body'>
                <div>
                    <p>Enter the name of the Segment</p>
                </div>
                <div className="name-box">
                    <input 
                    type="text" 
                    placeholder='Name of the Segment' 
                    name='name' 
                    id="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="form">
                    <label htmlFor="schemas">To save your segment, you need to add the schemas to build the query</label>
                    {schemaList.map((sch,index) => (
                        <div key={index} className="schemas">
                            <div className="field">
                                <select 
                                    name="schema" 
                                    id="schema" 
                                    value={sch.schema}
                                    onChange={(e)=> handleSchemaChange(e,index)}
                                    required
                                >
                                    <option selected>Select...</option>
                                    <option value="firstname" label="First Name" />
                                    <option value="lastname" label="Last Name" />
                                    <option value="gender" label="Gender" />
                                    <option value="age" label="Age" />
                                    <option value="accountname" label="Account Name" />
                                    <option value="city" label="City" />
                                    <option value="state" label="State" />
                                </select>
                            {schemaList.length!==1 && (
                                <button
                                type="button"
                                onClick={()=>handleSchemaRemove(index)}
                                className="remove-btn"
                                >
                                <span>-</span>
                                </button>
                                )}
                            </div>
                            {schemaList.length - 1 === index && schemaList.length <7  && (
                                <button
                                type="button"
                                onClick={handleSchemaAdd}
                                className="add-btn"
                                >
                                <span><b>+Add new Schema</b></span>
                                </button>
                                )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">
                <button className="save-btn" onClick={handleSubmit} >Save the Segment</button>
                <button className="cancel-btn" onClick={handleCancel} >Cancel</button>
            </div>
        </>
    )
}

export default Segment