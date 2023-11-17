"use strict";
const ASCENDING = 1
let attractions = []; // Define attractions as an empty array
let add1 = {free: "no", rating: 5, tags: ["Historical", "Entertainment", "Music venue", "Bar", "Events"]};
let add2 = {free: "no", rating: 1, tags: ["Sport", "Entertainment", "Music venue", "Bar"]};
let add3 = {free: "yes", rating: 4, tags: ["Bar", "Entertainment", "Music venue"]};
let add4 = {free: "no", rating: 1, tags: ["Historical", "Transport"]};
let add5 = {free: "yes", rating: 4, tags: ["Historical"]};
let add6 = {free: "yes", rating: 5, tags: ["Church", "Historical"]};
let add7 = {free: "yes", rating: 2, tags: ["Political"]};
let add8 = {free: "no", rating: 2, tags: ["Historical", "Political"]};
let add9 = {free: "yes", rating: 3, tags: ["Transport"]};
let add10 = {free: "no", rating: 3, tags: ["Events", "Food"]};
            
class AddModal extends React.Component {
    static propTypes = {
        attractions: PropTypes.array,
        closeModal: PropTypes.func,
        onAddAttraction: PropTypes.func,
    };
    constructor(props) {
        super(props);
       /*Initialize state with default values*/
        this.state = {
            name: "",
            address: "",
            free: "yes",
            rating: "1",
            tags: "",
            contactNumber: "",
            description: "",
            latitude:"",
            longitude:"",
            /*error messeres for the input */
            errors: {
                name: 'Enter a valid name must be between 1 and 200 ',
                contactNumber: 'Enter a Valid contact number',
                description: 'enter an description with a length of 1 and 1000',
                address: 'Must end in Dublin code eg Dublin 1',
                latitude:'Enter a valid latitude',
                longitude:'Enter a valid longitude'
                
            },
        };
    }
     validatelatitude()
    {
        //from https://regexlib.com/search.aspx?k=latitud&AspxAutoDetectCookieSupport=1
        const pattern = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/
        return pattern.test(String(this.state.latitude))
    }
    
       validatelongitude()
    {
        //from https://regexlib.com/search.aspx?k=latitud&AspxAutoDetectCookieSupport=1
        const pattern = /^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}/
        return pattern.test(String(this.state.longitude))
    }
    
    validatecontactNumber()
    {
        //from https://ihateregex.io/expr/phone/
        const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        return pattern.test(String(this.state.contactNumber))
    }
      validateName()
    {
        const pattern =  /^.{1,200}$/
        return pattern.test(String(this.state.name))
    }
      validateDesc()
    {   
        const pattern =  /^.{1,1000}$/
        return pattern.test(String(this.state.description))
    }
     validateAddress()
    { 
        const pattern =  /^.*Dublin\s\d+$/;
        return pattern.test(String(this.state.address))
    }
    validateAttraction() {
        return {
            name: this.validateName(),
            address: this.validateAddress(),
            free:!!this.state.free,
            rating:!!this.state.rating,
            contactNumber: this.validatecontactNumber(),
            description: this.validateDesc(),
            tags: !!this.state.tags,
            latitude:this.validatelatitude(),
            longitude:this.validatelongitude()};
    }
    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };
            /*function to adding a new attraction*/
            handleAddAttraction = () => {
        const formInputsState = this.validateAttraction();
        console.log("formInputsState", formInputsState);
        if (Object.keys(formInputsState).every((index) => formInputsState[index])) {
           /*Create an attraction object from the state*/
            const newAttraction = {
                name: this.state.name,
                address: this.state.address,
                free: this.state.free,
                rating: parseInt(this.state.rating),
                description: this.state.description,
                contactNumber: this.state.contactNumber,
                tags: this.state.tags.split(",").map((tag) => tag.trim()),
                imageLink: this.state.imageLink,
                latitude:this.state.latitude,
                longitude:this.state.longitude,
                
            };
            /*Pass the new attraction to the parent component*/

            if (this.props.onAddAttraction) {
                this.props.onAddAttraction(newAttraction);

            }

            this.props.closeModal();
        }
    };
            render() {
        const {errors} = this.state;
        return (
                <div id="modal">
                    <div id="modalContent">
                        <h1>Add Attraction</h1>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
                              {!this.validateName() && <div className="error">{errors.name}</div>}
                        </div>
                        <div>
                            <label>Description:</label>
                            <input type="text" name="description" value={this.state.desctiption} onChange={this.handleInputChange}/>
                            {!this.validateDesc() && <div className="error">{errors.description}</div>}
                        </div>
                        <div>
                            <label>Contact Number:</label>
                            <input type="text" name="contactNumber" value={this.state.contactNumber} onChange={this.handleInputChange} />
                             {!this.validatecontactNumber() && <div className="error">{errors.contactNumber}</div>}
                        </div>
                
                        <div>
                            <label>Rating:</label>
                            <select
                                name="rating"
                                value={this.state.rating}
                                onChange={this.handleInputChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}/>
                            {!this.validateAddress() && <div className="error">{errors.address}</div>}
                        </div>
                        <div>
                            <label>Free:</label>
                            <select
                                name="free"
                                value={this.state.free}
                                onChange={this.handleInputChange}>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                        <div>
                            <label>Tag:</label>
                            <input
                                type="text"
                                name="tags"
                                value={this.state.tags}
                                onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label>Image Link:</label>
                            <input
                                type="text"
                                name="imageLink"
                                value={this.state.imageLink}
                                onChange={this.handleInputChange}/>
                        </div>
                         <div>
        
                        <label>Latitude:</label>
                       <input type="text" name="latitude"  
                            value={this.state.latitude} 
                            onChange={this.handleInputChange}/>
                       {!this.validatelatitude() && <div className="error">{errors.latitude}</div>}
                        </div>
                        <div>
                            <label>Longitude:</label>
                       <input type="text" name="longitude"  
                            value={this.state.longitude} 
                            onChange={this.handleInputChange}/>
                       {!this.validatelongitude() && <div className="error">{errors.longitude}</div>}
                            </div>
                        <div>
                            <button onClick={this.handleAddAttraction}>Save</button>
                        </div>
                        <div id="exitButton" onClick={this.props.closeModal}>
                            <img src="img/exit.png" alt="Exit button" />
                        </div>
                    </div>
                </div>
                );
    }
}
class ModifyModal extends React.Component {
    static propTypes = {
        attractions: PropTypes.object,
        closeModal: PropTypes.func,
        onAttractionModify: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            modifiedAttraction: {...props.attractions},
            /*error messerages */
            errors: {
                name: 'Enter a valid name, must be between 1 and 200 characters',
                contactNumber: 'Enter a valid contact number',
                description: 'Enter a description with a length of 1 and 1000 characters',
                address: 'Must end in Dublin code, e.g., Dublin 1',
                latitude: 'Enter a valid latitude',
                longitude: 'Enter a valid longitude'
            },
        };
    }
    
    validateContactNumber() {
        const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return pattern.test(String(this.state.modifiedAttraction.contactNumber));
    }

    validateName() {
        const pattern = /^.{1,200}$/;
        return pattern.test(String(this.state.modifiedAttraction.name));
    }

    validateDesc() {
        const pattern = /^.{1,1000}$/;
        return pattern.test(String(this.state.modifiedAttraction.description));
    }
    
    validateAddress() {
        const pattern = /^.*Dublin\s\d+$/;
        return pattern.test(String(this.state.modifiedAttraction.address));
    }
    
     validatelatitude()
    {
        //from https://regexlib.com/search.aspx?k=latitud&AspxAutoDetectCookieSupport=1
        const pattern = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/
         return pattern.test(String(this.state.modifiedAttraction.latitude));
    }
    
       validatelongitude()
    {
        //from https://regexlib.com/search.aspx?k=latitud&AspxAutoDetectCookieSupport=1
        const pattern = /^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}/
         return pattern.test(String(this.state.modifiedAttraction.longitude));
    }

    validateAttraction() {
        return {
            name: this.validateName(),
            address: this.validateAddress(),
            contactNumber: this.validateContactNumber(),
            description: this.validateDesc(),
            tags: !!this.state.modifiedAttraction.tags,
            latitude: this.validatelatitude(),
            longitude: this.validatelongitude(),
        };
    }

        modifyAttraction(name, address, rating, free, description, contactNumber,  tags, imageLink, latitude,
            longitude) {
        const modifiedAttraction = {
            
            name,
            address,
            free,
            rating: parseInt(rating),
            description,
            contactNumber,
            tags,
            imageLink,
            latitude,
            longitude
        };

        /*Call the parent component's function to handle saving the modified attraction*/
        this.props.onAttractionModify(modifiedAttraction);

        /* Close the modal*/
        this.props.closeModal();
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        /* Update the modifiedAttraction state with the edited values*/
        this.setState((prevState) => ({
            modifiedAttraction: {
                ...prevState.modifiedAttraction,
                [name]: value,
            },
        }));
    };

   handleSave = () => {
        const formInputsState = this.validateAttraction();
        console.log("formInputsState", formInputsState);

        if (Object.keys(formInputsState).every((index) => formInputsState[index])) {
           /* saved if all validations passed*/

            const {
                 name,
                 address,
                 free,
                rating,
                description,
                contactNumber,
                tags,
                imageLink,
                latitude,
                longitude
            } = this.state.modifiedAttraction;

            /* Call the modifyAttraction function with the modified values*/
            this.modifyAttraction(name, address, rating, free, description, contactNumber,  tags, imageLink, latitude, longitude);
        }
    };
 render() {
      const {errors} = this.state;
        return (
                <div id="modal">
                    <div id="modalContent">
                        <h1>Edit Attraction</h1>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.modifiedAttraction.name}
                                onChange={this.handleInputChange}
                                />
                                 {!this.validateName() && <div className="error">{errors.name}</div>}
                        </div>
                        <div>
                            <label>Rating:</label>
                            <select
                                name="rating"
                                value={this.state.modifiedAttraction.rating}
                                onChange={this.handleInputChange}
                                >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                
                        <div>
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={this.state.modifiedAttraction.address}
                                onChange={this.handleInputChange}
                                />
                            {!this.validateAddress() && <div className="error">{errors.address}</div>}
                        </div>
                         <div>
                            <label>Description:</label>
                            <input type="text" name="description"  
                            value={this.state.modifiedAttraction.description} 
                            onChange={this.handleInputChange}/>
                            {!this.validateDesc() && <div className="error">{errors.description}</div>}
                        </div>
                
                        <div>
                            <label>Contact Number:</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={this.state.modifiedAttraction.contactNumber}
                                onChange={this.handleInputChange}
                                />
                            {!this.validateContactNumber() && <div className="error">{errors.contactNumber}</div>}
                        </div>
                        <div>
                            <label>Free:</label>
                            <select
                                name="free"
                                value={this.state.modifiedAttraction.free}
                                onChange={this.handleInputChange}
                                >
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>
                        </div>
                        <div>
                            <label>tags:</label>
                            <input
                                type="text"
                                name="tags"
                                value={this.state.modifiedAttraction.tags}
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <div>
                            <label>Image Link:</label>
                            <input
                                type="text"
                                name="imageLink"
                                value={this.state.modifiedAttraction.imageLink}
                                onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label>latitude:</label>
                            <input
                                type="text"
                                name="latitude"
                                value={this.state.modifiedAttraction.latitude}
                                onChange={this.handleInputChange}/>
                            {!this.validatelatitude() && <div className="error">{errors.latitude}</div>}
                        </div>
                        
                        <div>
                    <label>longitude:</label>
                     <input
                         type="text"
                        name="longitude" 
                        value={this.state.modifiedAttraction.longitude}
                        onChange={this.handleInputChange}
    />
    {!this.validatelongitude() && <div className="error">{errors.longitude}</div>}
</div>
                        
                        
                       
                        <div>
                            <button onClick={this.handleSave}>Save</button>
                        </div>
                        <div id="exitButton" onClick={this.props.closeModal}>
                            <img src="img/exit.png" alt="Exit button" />
                        </div>
                    </div>
                </div>
                );
    }
}

class Modal extends React.Component {
    static propTypes = {
        attractions: PropTypes.object,
        closeModal: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    /* map is from https://developers.google.com/maps/documentation/embed/embedding-map -->*/

    render() {
        const latitude = this.props.attractions.latitude;
        const longitude = this.props.attractions.longitude;
         
        const img = this.props.attractions.imageLink
                ? this.props.attractions.imageLink
                : 'https://thumbs.dreamstime.com/b/dublin-liffey-liberty-hall-spire-dublin-ireland-white-background-75082428.jpg';
        return (
                
                <div id="modal">
                    <div id="modalContent">
                
                
                        <h1>{this.props.attractions.name}</h1>
                        <div><img id = "image" src={img} alt="atrraction image" /></div>
                        {this.props.attractions.rating && (
                                            <div>
                                                <h2>Rating</h2> <p>{this.props.attractions.rating}</p>
                                            </div>
                                            )}
                        <h2>Description</h2>
                        <p>{this.props.attractions.description}</p>
                        <h2>Address</h2>
                        <p>{this.props.attractions.address}</p>
                        {this.props.attractions.contactNumber && (
                                    <div>
                                        <h2>Contact Number</h2>
                                        <p>{this.props.attractions.contactNumber}</p>
                                    </div>
                                    
                                    )}  
                           <div><iframe width="500" height="100" frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB0YKKfdxa3JYHZJfNfB3jaDHJRRXSapCY&q=${latitude},${longitude}`}
              allowFullScreen></iframe>
          </div>
      
        {this.props.attractions.tags && this.props.attractions.tags.length > 0 && (
                                    <div>
                                        <h2>Tags</h2>
                                        <p>{this.props.attractions.tags.toString()}</p>
                                    </div>
                                    )}
                        <div id="exitButton" onClick={this.props.closeModal}>
                            <img src="img/exit.png" alt="Exit button" />
                        </div>
                    </div>
                </div>
                );
    }
}
class TagsCheackBox extends React.Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        attractions: PropTypes.array,
        handleTagCheckboxChange: PropTypes.func,
        tag: PropTypes.array,
    }
    render() {
        const {attractions} = this.props;
        /*Extract unique tags from attractions, filter empty tags, and sort them*/
        const tagCheckboxes = [...new Set(attractions.map((attraction) => attraction.tags).flat())]
                .filter((tag) => tag && tag.trim() !== "")
                .sort();
        return (
                <div className="tags_check">
                    {tagCheckboxes.map((tag) => (
                                                <div key={tag}>
                                                    <input type="checkbox" id={tag} name ={tag} value={tag} onChange={() => this.props.handleTagCheckboxChange(tag)}/>{tag}<br />
                                                </div>))}
                                            </div>);
            }
        }
        class DropDownRating extends React.Component {
            constructor(props) {
                super(props);
            }

            static propTypes = {
                rating: PropTypes.array,
                handleRatingChange: PropTypes.func,
            }
            handleRatingChange = (e) => {
                if (this.props.handleRatingChange) {
                    this.props.handleRatingChange(e);
                }
            }
            render() {
                return (
                                <select name="rating" onChange={this.handleRatingChange}>
                                    {this.props.rating.map(rating => <option key={rating} value={rating}>{rating}</option>)}
                                </select>
                        )
            }
        }
        class AttractionRow extends React.Component
        {
            constructor(props) {
                super(props);
            }
            static propTypes =
                    {
                        attractions: PropTypes.object,
                    }

            render()
            {
                return (
                                <tr onClick={this.handleRowClick} >
                                    <td>
                                        {this.props.attractions.name}</td><td>{this.props.attractions.address}</td>{(this.props.rating === "All Ratings") ? (<td>{this.props.attractions.rating}</td>) : null}<td className="free">{this.props.attractions.free}</td>
                                </tr>
                                        )
                            }
                        }
                        class AttractionTable extends React.Component {
                            constructor(props) {
                                super(props);
                                this.state = {
                                    attractions: props.attractions,
                                    rating: props.rating,
                                    sortDirection: ASCENDING,
                                    sortColumn: "name"
                                };
                            }
                            static propTypes =
                                    {
                                        attractions: PropTypes.array,
                                        rating: PropTypes.string
                                    }
                            componentDidMount()
                            {
                                /*Sort attractions by name in ascending order and update the state*/
                                this.props.attractions.sort((a, b) => a["name"] < b["name"] ? -1 : 1)
                                this.setState({sortColumn: "name"})
                            }
                            static getDerivedStateFromProps(props, state)
                            {
                                /*see if the attractions in the state are different from the new props*/
                                if (state.countries !== props.attraction)
                                {
                               /*Determine the new sort direction based on the current sortColumn*/
                                    const sortColumn = "name"
                                    let sortDirection = state.sortDirection
                                    if (state.sortColumn === sortColumn)
                                    {
                                        sortDirection = -sortDirection
                                    } else
                                    {
                                        sortDirection = 1
                                    }
                                    /*Sort attractions based on the new sortColumn and sortDirection*/
                                    props.attractions.sort((a, b) => a[sortColumn] < b[sortColumn] ? -sortDirection : sortDirection)
                                }
                                /*Return the updated state if attractions have changed, or return null*/
                                return(state.attractions !== props.attractions ? {attractions: props.attractions, sortDirection: 1, sortColumn: "name"} : null)
                            }
                            handleRowClick = (attraction) => {
                                
                                if (this.props.onAttractionClick) {
                                    this.props.onAttractionClick(attraction);
                                }
                            }
                            handleModifyButtonClick = (attraction) => {
                                if (this.props.onModifyModalClick) {
                                    this.props.onModifyModalClick(attraction);
                                }
                            }
                            handleHeaderClick = (sortColumn) => {
                                let sortDirection = this.state.sortDirection;
                                if (this.state.sortColumn === sortColumn) {
                                    sortDirection = -sortDirection;
                                } else {
                                    sortDirection = ASCENDING;
                                }
                                this.sortAttractions(sortColumn, sortDirection);
                            };
                                    sortAttractions = (sortColumn, sortDirection) => {
                                this.props.attractions.sort((a, b) =>
                                    a[sortColumn] < b[sortColumn] ? -sortDirection : sortDirection
                                );
                                this.setState({sortColumn, sortDirection});
                            };
                                    handleDeleteClick = (attraction) => {
                                // Create a copy of the existing attractions array and remove the attraction to delete
                                const updatedAttractions = this.state.attractions.filter((a) => a !== attraction);
                                // Update the state with the updated attractions data
                                this.setState({
                                    attractions: updatedAttractions,
                                    selectedAttractions: updatedAttractions,
                                });
                                // Save the updated attractions to localStorage if needed
                                localStorage.setItem('attractions', JSON.stringify(updatedAttractions));
                            };
                                    render()
                            {
                                const {attractions, modifiedAttraction} = this.state;
                                // Filter attractions based on whether an attraction is being modified or not
                                const filteredAttractions = modifiedAttraction
                                        ? attractions.filter((attraction) => attraction.id !== modifiedAttraction.id)
                                        : attractions;
                                if (!attractions || attractions.length === 0) {
                                    return null; // Return nothing or a loading indicator
                                }
                                let keys = Object.keys(attractions[0]).filter(key => key !== "poiID").filter(key => key !== "latitude").filter(key => key !== "longitude").filter(key => key !== "contactNumber").filter(key => key !== "lastUpdate").filter(key => key !== "imageFileName").filter(key => key !== "tags").filter(key => key !== "description").filter(key => key !== "imageLink");
                                return (
                                                <div>
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th id="name" onClick={() => this.handleHeaderClick("name")} className="header">
                                                                    Name{" "}
                                                                    {this.state.sortColumn === "name" && this.state.sortDirection === ASCENDING && (
                                                                    <i className="arrow up"></i>)}
                                                                    {this.state.sortColumn === "name" && this.state.sortDirection === -ASCENDING && (
                                                                    <i className="arrow down"></i>)}
                                                                </th>
                                                            <tr>
                                                                <th id="address" onClick={() => this.handleHeaderClick("address")} className="header">
                                                                    Address{" "}
                                                                    {this.state.sortColumn === "address" && this.state.sortDirection === ASCENDING && (
                                                                    <i className="arrow up"></i>)}
                                                                    {this.state.sortColumn === "address" && this.state.sortDirection === -ASCENDING && (
                                                                    <i className="arrow down"></i>)}
                                                                </th>
                                                            </tr>
                                                        <th id="free" className="header">Free</th>
                                                        <th id="rating" className="header">Rating</th>
                                                        </tr></thead>
                                                        <tbody>
                                                            {attractions.sort().map(attractions =>
                                                                <tr key={attractions.id} onClick={() => this.handleRowClick(attractions)}>
                                                    
                                                                    {keys.map(key => <td>{attractions[key]} </td>)}
                                                    
                                                                    <td id="modButton" onClick={() => this.props.onModifyModalClick(attractions)}>
                                                                        <button>Modify</button>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => this.handleDeleteClick(attractions)}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                                )}
                                                        </tbody>
                                                
                                                    </table>
                                                </div>
                                        );
                            };
                        }
                        class AttractionForm extends React.Component {
                            constructor(props) {

                                super(props)

                                this.state = {
                                    attractions: [],
                                    selectedAttractions: [],
                                    rating: [],
                                    free: [],
                                    selectedRating: "All Rating",
                                    selectedAttraction: null,
                                    modifiedAttraction: null,
                                    showAddModal: false,
                                    selectedTags: [],
                                    searchName: "",
                                    
                                };
                            }

                            componentDidMount() {
                                // Fetch the JSON data
                                fetch('json/DublinAttractions.json')
                                        .then((response) => response.json())
                                        .then((data) => {
                                            if (!Array.isArray(data)) {
                                                console.error("Data is not valid.");
                                                return;
                                            }
                                            const addObjects = [add1, add2, add3, add4, add5, add6, add7, add8, add9, add10];
                                            const modifiedData = [...data];
                                            for (let i = 0; i < addObjects.length; i++) {
                                                modifiedData[i] = {...modifiedData[i], ...addObjects[i]};
                                            }
                                            let attractions = modifiedData.map((attraction, index) => ({...attraction, ...addObjects[index]}));
                                            let ratings = modifiedData.map((attraction) => attraction.rating);
                                            let free = modifiedData.map((attraction) => attraction.free);
                                            // let uniqueRatings = [...new Set(ratings)].sort();
                                            let uniqueRatings = [...new Set(ratings)].map(rating => rating || "None").sort();
                                            uniqueRatings.unshift("All Rating");
                                            uniqueRatings[uniqueRatings.indexOf("")] = "None";
                                            this.setState({attractions, selectedAttractions: attractions, rating: uniqueRatings, });
                                            // Retrieve attractions from local storage
                                            const storedAttractions = localStorage.getItem("attractions");
                                            // Bind the handleTagCheckboxChange function to the component instance
                                            this.handleTagCheckboxChange = this.handleTagCheckboxChange.bind(this);
                                            if (storedAttractions) {
                                                const parsedAttractions = JSON.parse(storedAttractions);
                                                this.setState({
                                                    attractions: parsedAttractions,
                                                    selectedAttractions: parsedAttractions,
                                                });
                                            }
                                        })
                                        .catch((error) => {
                                            console.error("Error fetching JSON data: ", error);
                                        });
                            }
                            handleDeleteButtonClick = (attraction) => {
                                // Find the index of the attraction to delete in the attractions array
                                const index = this.state.attractions.findIndex((a) => a.name === attraction.name);
                                if (index !== -1) {
                                    // Create a copy of the existing attractions array and remove the attraction to delete
                                    const updatedAttractions = [...this.state.attractions];
                                    updatedAttractions.splice(index, 1);
                                    // Update the state with the updated attractions data
                                    this.setState({
                                        attractions: updatedAttractions,
                                        selectedAttractions: updatedAttractions,
                                    });
                                }
                                ;
                            }
                            handleRatingChange = (e) => {
                                const selectedRating = e.target.value;
                                /* Update the selectedRating state*/
                                this.setState({
                                    selectedRating: selectedRating,
                                });
                                /* Filter attractions based on both rating and tags*/
                                this.filterAttractions(selectedRating, this.state.selectedTags);
                            }
                            ;
                                    handleModifyButtonClick = (attraction) => {
                                this.setState({
                                    modifiedAttraction: attraction
                                });
                            }
                            closeModal = () => {
                                this.setState({
                                    selectedAttraction: null,
                                     /* reset modifiedAttraction */
                                     modifiedAttraction: null,
                                });
                            }
                            ;
                                    handleSave = () => {
                                this.props.onAttractionModify(this.state.modifiedAttraction);
                                this.closeModal();
                            }
                            ;
                                    handleAttractionClick = (attraction) => {
                                this.setState({
                                    selectedAttraction: attraction,
                                });
                            }
                            ;
                                    handleModifyButtonClick = (attraction) => {
                                this.setState({
                                    modifiedAttraction: attraction
                                });
                            }
                            handleAttractionModify = (modifiedAttraction) => {
                                /*find the index of the attractions that will be modifyed */
                                const index = this.state.attractions.findIndex(
                                        (attraction) => attraction.name === modifiedAttraction.name
                                );
                        /*see if the attaction is in the array */
                                if (index !== -1) {
                                    /*create a copy of attractions*/
                                    const updatedAttractions = [...this.state.attractions];
                                    /*update the attraction at the index with the modifiyed attraction */
                                    updatedAttractions[index] = modifiedAttraction;
                                    /*Update the state with the modified attractions, reset modifiedAttraction*/
                                    this.setState({
                                        attractions: updatedAttractions,
                                        selectedAttractions: updatedAttractions,
                                        modifiedAttraction: null,
                                    });

                                    localStorage.setItem('attractions', JSON.stringify(updatedAttractions));
                                }
                            };
                                    showAddModal = () => {
                                this.setState({
                                     
                                    showAddModal: true,
                                });
                            };
                                    closeAddModal = () => {
                                this.setState({
                                    showAddModal: false,
                                    showDeleteModal: false,
                                      
                                });
                            };
                                    handleAddAttraction = (newAttraction) => {
                                /* Create a copy of the existing attractions array and add the new attraction to it*/
                                const updatedAttractions = [...this.state.attractions, newAttraction];
                               /*Update the state with the new attractions data*/
                                this.setState({
                                    attractions: updatedAttractions,
                                    selectedAttractions: updatedAttractions,
                                });
                                /* Save the updated attractions to localStorage*/
                                localStorage.setItem('attractions', JSON.stringify(updatedAttractions));
                            };
                                    handleTagCheckboxChange = (tag) => {
                                /* Update the selectedTags state based on checkbox changes*/
                                const updatedTags = [...this.state.selectedTags];

                                if (updatedTags.includes(tag)) {
                                   /*Remove tag if already selected*/
                                    updatedTags.splice(updatedTags.indexOf(tag), 1);
                                } else {
                                    /* Add tag if not selected*/
                                    updatedTags.push(tag);
                                }
                                /* Update the state*/
                                this.setState({
                                    selectedTags: updatedTags,
                                });
                               /*Filter attractions based on both rating and tags*/
                                this.filterAttractions(this.state.selectedRating, updatedTags);
                            };
                                    filterAttractions = (selectedRating, selectedTags) => {
                                const filteredAttractions = this.state.attractions.filter((attraction) => {
                                    /*get the tags from the attraction, default to an empty array if no tags are present*/
                                    const tags = attraction.tags || [];
                                    /*see if the attractions rating matches the selecteted rating */
                                    const matchRating =
                                            selectedRating === "All Rating" || (selectedRating === "None" && !attraction.rating) || attraction.rating === parseInt(selectedRating);
                                   /*see if the attaractions tags are the same as the selected tags*/
                                        const matchTags =
                                            Array.isArray(selectedTags) && selectedTags.length > 0
                                            ? selectedTags.every((tag) => tags.includes(tag))
                                            : true;
                                            /*see if the attractions name includs whats being serched for */
                                    const matchingName = attraction.name.toLowerCase().includes(this.state.searchName.toLowerCase());
                                    /*true if all the conditions are met  */
                                    return matchRating && matchTags && matchingName;

                                });
                                /* Update the state with the filtered attractions*/
                                this.setState({
                                    selectedAttractions: filteredAttractions,
                                });
                            };

                                    render()
                            {
                                return (
                                                <div id="attractionsDiv">
                                                    <div className="dropdown-container">
                                                        <DropDownRating className="dropdown-toggle"
                                                                        rating={this.state.rating}
                                                                        handleRatingChange={this.handleRatingChange}
                                                                        selectedRating={this.state.selectedRating}/>
                                                        {this.state.showAddModal && (
                                                                            <AddModal
                                                                                closeModal={this.closeAddModal}
                                                                                attractions={this.state.attractions}
                                                                                onAddAttraction={this.handleAddAttraction}/>)}
                                                        <button onClick={this.showAddModal}>Add Attractions</button>
                                                        <input
                                                            type="text"
                                                            placeholder="Search by Name"
                                                            value={this.state.searchName}
                                                            onChange={(e) => {
                                                                    this.setState({searchName: e.target.value}, () => {
                                                            this.filterAttractions(this.state.selectedRating, this.state.selectedTags);
                                                        });
                                                    }}
                                                
                                                            />
                                                
                                                    </div>
                                                    <div className="box">
                                                        <TagsCheackBox 
                                                            attractions={this.state.selectedAttractions}
                                                            handleTagCheckboxChange={this.handleTagCheckboxChange}/>
                                                    </div>
                                                    {this.state.selectedAttraction && (
                                                                    <Modal
                                                                        attractions={this.state.selectedAttraction}
                                                                        closeModal={this.closeModal}/>)}
                                                    {this.state.modifiedAttraction && (
                                                                    <ModifyModal
                                                                        attractions={this.state.modifiedAttraction}
                                                                        closeModal={this.closeModal}
                                                                        onAttractionModify={this.handleAttractionModify}/>)}
                                                
                                                    <AttractionTable 
                                                        attractions={this.state.selectedAttractions}
                                                        rating={this.state.selectedRating}
                                                        modifiedAttraction={this.state.modifiedAttraction}
                                                        onAttractionClick={this.handleAttractionClick}
                                                        onModifyModalClick={this.handleModifyButtonClick}
                                                        onDeleteAttraction={this.handleDeleteButtonClick}/>
                                                </div>
                                        )
                            }
                        }