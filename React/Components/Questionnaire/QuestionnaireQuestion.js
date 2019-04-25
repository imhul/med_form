class QuestionnaireQuestion extends React.Component {
    state = {
        isOpen: true,
        text: false,
        showChild: '1'
    }

    render() {
        const {question, isOpen} = this.props
        const value = this.state.isOpen && <span>{question.Name}</span>
        
        var TmpQuestionList = ''

        if(question.Options)
        {
            TmpQuestionList = <QuestionnaireOptionList questions={question.Options} hospitalization={this.props.hospitalization} />
        }
        
        return(
            <div className='QuestionBox' onClick={this.props.action} >
                
                {question.Value}
                <div>
                    {(question.Type=='text')?(<FormInput className={this.props.parentState.showChild==false ? 'HiddenBox' : ''} question={question} hospitalization={this.props.hospitalization} />):('')}
                    {(question.Type=='textarea')?(<FormTextarea question={question} hospitalization={this.props.hospitalization} />):('')}
                    {(question.Type=='radio')?(TmpQuestionList):('')}
                    {(question.Type=='checkbox')?(TmpQuestionList):('')}
                </div>
            </div>
        )
    }

    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}