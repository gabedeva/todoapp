import React, { Component } from 'react';

class DropSelect extends Component{

    constructor(props){
        super(props)

        this.state = {
            options: [],
            selected: {
                value: '',
                label: '',
                left: '',
                image: ''
            },
            isOpen: false,
            placeholder: ''
        }

        this.menuListRef = React.createRef();
        this.optionRef = React.createRef();
        this.menuRef = React.createRef()
        this.inputRef = React.createRef()
    }

    componentDidMount(){

        this.setState({
            ...this.state,
            options: this.props.options ? this.props.options() : [],
            placeholder: this.props.placeholder ? this.props.placeholder : 'Select'
        })
    }

    openMenu = (e) => {
        e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen });
        this.clearField();
        this.setState({
            options: this.getOptions()
        })
    }

    closeMenu = (e) => {
        e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen });
        this.clearField();
        this.setState({
            options: this.getOptions()
        })
    }

    focusInput = (input) => {
        if(input !== null && this.props.focus){
            input.focus();
        }
        
    }

    clearField = () => {
        if(this.state.isOpen && this.inputRef.current !== null){
            this.inputRef.current.value = '';
        }
    }

    getOptions = () => {
        return this.props.options ? this.props.options() : [];
    }

    handleSelected = (e, o) => {
        e.preventDefault();
        
        let m;
        if(o && o.left.includes('-')){
            m = o.left.split('-')[1];
            m = '+' + m;
        }else{
            m = o.left;
        }

        // set the selected state
        this.setState({
           
            ...this.state,
            selected: {
                value: o.value,
                label: o.label,
                left: m,
                image: o.image
            },
            placeholder: null
        });

        // Remove unwanted strings( i.e +, -)
        let c;
        if(o.left){
            if(o.left.includes('-')){
                c = o.left.split('-')[1];
            }else if(o.left.includes('+')){
                c = o.left.split('+')[1];
            }else{
                c = o.left;
            }
        }

        // Data to return
        let cData = {
            value: o.value,
            label: o.label,
            left: c,
            image: o.image
        }

        this.props.onChange(cData);
        this.closeMenu(e);
    }

    search = (e) => {
        e.preventDefault();

        let currentList = [];
        let newList= [];

        if(e.target.value !== ''){

            currentList = this.getOptions();
            newList = currentList.filter((item) => {

                const c = item.label.toLowerCase();
                const f = e.target.value.toLowerCase();

                if(c.includes(f) !== null){
                    return c.includes(f);  // returns all options includes in the letter
                }
                
            })

        }else{
            newList = this.getOptions();
        }

        this.setState({ ...this.state, options: newList });
    }

    render(){

        return(

            <>
            
                <div className={`select-box ${this.props.className ? this.props.className : ''} ${this.props.isDisabled ? 'disabled' : ''}`}>

                    <div onClick={(e) => this.openMenu(e)} className="control">

                        <div className="single">
                            {
                                this.state.selected.value === '' && (this.props.defaultValue === undefined) && this.state.placeholder !== '' &&
                                <div className="single__placeholder">
                                    <span>{this.state.placeholder}</span>
                                </div>
                            }

                            {
                                this.state.selected.value === '' && this.props.defaultValue && this.props.defaultValue.image !== '' && this.props.controlDisplayImage === true &&
                                <div className="single__image">
                                    <img src={this.props.defaultValue.image ? this.props.defaultValue.image : ''} alt="single-image" />
                                </div>
                            }

                            {
                                this.state.selected.value !== '' && (this.props.defaultValue || !this.props.defaultValue) && this.props.controlDisplayImage === true &&
                                <div className="single__image">
                                    <img src={this.state.selected.image} alt="single-image" />
                                </div>
                            }

                            {
                                this.state.selected.value === '' && this.props.defaultValue && this.props.defaultValue.label !== '' && this.props.controlDisplayLabel === true &&
                                <div className="single__label">{this.props.defaultValue ? this.props.defaultValue.label : ''}</div>
                            }
                         
                            {
                                this.state.selected.value !== '' && (this.props.defaultValue || !this.props.defaultValue) && this.props.controlDisplayLabel === true &&
                                <div className="single__label">{this.state.selected.label}</div>
                            }
                            {
                                this.state.selected.value === '' && this.props.defaultValue && this.props.defaultValue.left !== '' && this.props.controlDisplayLeft === true &&
                                <div className="single__left">
                                     <span>{this.props.defaultValue.left ? this.props.defaultValue.left : ''}</span>
                                </div>
                            }
                            {
                                this.state.selected.value !== '' && (this.props.defaultValue || !this.props.defaultValue) && this.props.controlDisplayLeft === true &&
                                <div className="single__left">
                                     <span>{this.state.selected.left}</span>
                              </div>
                            } 
                          
                        </div>

                        <div className="indicator-box">
                            {
                                this.props.disableSeparator === undefined && <div className="separator"></div>
                            }

                            {
                                this.props.disableSeparator === true && <></>
                            }

                            {
                                this.props.disableSeparator === false && <div className="separator"></div>
                            }
                            
                            <div onClick={(e) => this.openMenu(e)} className="indicator">
                              <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg arrow down"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                            </div>
                        </div>

                    </div>

                    <div ref={this.menuRef} className={`menu ${this.state.isOpen ? 'is-open' : ''}`}>

                        <div className="menu-search">

                            <span className="search-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z" fill="currentColor" fill-rule="evenodd"></path></svg>
                            </span>

                            <input onChange={(e) => this.search(e)} ref={(input) => this.focusInput(input)} type="text" className="menu-search__input" placeholder="search" />
                        </div>

                        <div className="menu-list" ref={this.menuListRef}>

                            {
                                this.state.options.length > 0 &&
                                this.state.options.map((p) => 
                                    <>
                                        <div className="menu__option" ref={this.optionRef} onClick={(e) => this.handleSelected(e, p)}>

                                            {
                                                p.image !== '' && this.props.optionDisplayImage &&
                                                <div className="option__image">
                                                     <img src={p.image} alt="single-image" />
                                                </div>
                                            }


                                            {
                                                p.label !== '' && this.props.optionDisplayLabel &&
                                                <div className="option__label">{p.label}</div>

                                            }

                                            {
                                                p.left !== '' && this.props.optionDisplayLeft &&
                                                <div className="option__left">
                                                  <span>{p.left}</span>
                                                </div>

                                            }
                   
                                        </div>

                                    </>
                                )
                               
                            }

                            {
                                this.state.options.length <= 0 && 
                                <>
                                    <div className="menu__no-data">
                                        <span>No Data</span>
                                    </div>
                                </>
                            }

                        </div>
                    </div>

                </div>

            </>
        )
    }

}

export default DropSelect;