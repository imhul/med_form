class QuestionnaireOption extends React.Component {
    state = {
        isOpen: true,
        text: 'text'
    }

    render() {
        const {question, isOpen} = this.props
        const value = this.state.isOpen && <span>{question.Name}</span>
        
        const QuestionLine = (question.InLine)?('QuestionLine'):('QuestionBox')

        return(
            <div
                className={
                    question.InLine==1 ? 'QuestionLine' : 'QuestionBox'
                }
            >
                {question.TextBefore}
                
                {(question.Type=='text')?(<FormInput question={question} hospitalization={this.props.hospitalization} />):('')}
                {(question.Type=='textarea')?(<FormTextarea question={question} hospitalization={this.props.hospitalization} />):('')}
                {(question.Type=='radio')?(<FormRadio question={question} hospitalization={this.props.hospitalization} />):('')}
                {(question.Type=='checkbox')?(<FormCheckbox question={question} hospitalization=

                {this.props.hospitalization} />):('')}
                {question.TextAfter}
            </div>
        )
    }
    
    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}