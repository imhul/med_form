<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Запис лікаря приймального відділу</title>

    <!-- Style -->
    <link rel="stylesheet" type="text/css" href="Style/Template/Style.css">
    <link rel="stylesheet" type="text/css" href="Style/React/style.css">	

    <!-- JQuery -->
    <script type="text/javascript" language="javascript" src="Addon/jQuery/jQuery.js"></script> 
    <script type="text/javascript" language="javascript" src="Addon/System/Engine.js"></script>
    
    <!-- React -->
    <script src="Addon/React/react.development.js"></script>
    <script src="Addon/React/react-dom.development.js"></script>
    <script src="Addon/React/babel.min.js"></script>
    <script type="text/babel" src="React/react-app.js"></script>

    <script src="https://unpkg.com/prop-types@15.6.2/prop-types.min.js"></script>

</head>
<body>
    
    <script type="text/babel" src="React/Components/Questionnaire/Form/FormInput.js"></script>
    <script type="text/babel" src="React/Components/Questionnaire/Form/FormTextarea.js"></script>
    <script type="text/babel" src="React/Components/Questionnaire/Form/FormRadio.js"></script>
    <script type="text/babel" src="React/Components/Questionnaire/Form/FormCheckbox.js"></script>

    <script type="text/babel" src="React/Components/Questionnaire/QuestionnaireOption.js"></script>
    <script type="text/babel" src="React/Components/Questionnaire/QuestionnaireOptionList.js"></script>

    <script type="text/babel" src="React/Components/Questionnaire/QuestionnaireQuestion.js"></script>
    <script type="text/babel" src="React/Components/Questionnaire/QuestionnaireQuestionList.js"></script>

    <script type="text/babel">
        function GetQuestionnaireQuestions(Page=1)
        {
            ReactDOM.render(
                <div>
                    <img src="Images/Loading/Loading_02.gif" alt="Завантаження..." />    
                </div>,
                document.getElementById('HospitalizationReception')
            )
        
            var FieldsList = null;
            API('Call',
            {
                'Waiting': false,
                'Url': 'https://med.uax.co/API.php?Unit=Hospital&Section=HospitalPatients&Special=HospitalizationReception&Patient=2190&Hospitalization=8&Thread=Call&Object=Hospitalization&Method=GetQuestionnaireQuestions',
                'Data':
                {
                    'Hospital': 1,
                    'Patient': 2190,
                    'Hospitalization': 8,
                    'Reception': 6,
                    'Page': Page
                },
                'Finally': function(Response,Status,XHR)
                {
                    
                    var FieldsList = JSON.parse(Response['Data']);
                    
                    console.log(FieldsList);

                    var HospitalizationList = JSON.parse(Response['Hospitalization']);
                    
                    var FieldsStr = '';
                    
                    ReactDOM.render(
                        <QuestionnaireQuestionList questions={FieldsList} hospitalization={HospitalizationList} />,
                        document.getElementById('HospitalizationReception')
                    )

                    Message('Common','Remove');
                }
            });
        }
        GetQuestionnaireQuestions();
    </script>

    <div class="LeafBox" id="HospitalizationReception" style="margin-top:30px;margin-bottom:30px;">
        <img src="Images/Loading/Loading_02.gif" alt="Завантаження..." />
    </div>
        
</body>
</html>