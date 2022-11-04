import React from 'react';

const QuestionHeader = ({ isEnableRefNo = true, code = '', name='', disclosureCls = ''}) => (<div>
    <div className={`create-framework__row-wrapper m-b-1 ${disclosureCls}`}>
        {isEnableRefNo&&<><h1 className="create-framework__title">
            Ref No
        </h1>
        <input type="text" min="0" step=".1" className="refno_create_question" value={code}
            required disabled></input>
            </>
}
        <h1 className={`create-framework__title disclosure`}>
            Disclosure
            <img src='assets/images/questions.svg' alt='?' width='15px' height='15px' />
        </h1>
        <input type="text" className="create-framework__input"
            value={name} required disabled></input>
    </div>
</div>);

export default QuestionHeader;