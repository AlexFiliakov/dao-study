const Ch7 = () => {
    return (
      <div>
        <h3 className="font-bold">Key Differences and Their Implications:</h3>
        <ol style={{ listStyleType: 'decimal', paddingLeft: '1rem' }}>
            <li><strong className="font-semibold">"非以其无私邪？" vs. "非以其无私耶？"</strong></li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>Guodian/Mawangdui: "Is it not because he is selfless? (邪, xié)"</li>
                <li>Standard text: "Is it not because he is selfless? (耶, yé)"</li>
                <li>Implication of the Change:</li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>邪 (xié) in early texts is often a rhetorical question particle with a tone of emphasis or challenge. It gives a slightly more forceful or engaging quality to the question, implying something like:</li>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        <li>"Is it not precisely because he is selfless?"</li>
                        <li>This phrasing could suggest an invitation for the reader to reflect deeply on the answer.</li>
                    </ul>
                    <li>耶 (yé) in later Classical Chinese is a softer rhetorical question particle. It is more neutral and presents the question in a way that implies an explanation rather than a challenge:</li>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        <li>"Is it not because he is selfless?"</li>
                        <li>This makes the statement more didactic, as if simply confirming a truth rather than prompting reflection.</li>
                    </ul>
                </ul>
                <li>Philosophical Shift:</li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>The Guodian/Mawangdui version has a sharper, more thought-provoking tone.</li>
                    <li>The later standard text softens the rhetoric, making it more of a statement of fact rather than an invitation to inquiry.</li>
                </ul>
            </ul>
        </ol>
        <h3 className="font-bold mt-2">Final Interpretation:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
            <li>The Guodian/Mawangdui version asks the question with a stronger rhetorical force, encouraging introspection.</li>
            <li>The standard text presents it in a gentler, more explanatory way, as if confirming a known truth.</li>
            <li>Both versions convey the same philosophical message: that selflessness leads to true fulfillment. However, the older text encourages deeper engagement, while the later text reinforces the concept in a more didactic manner.</li>
        </ul>
      </div>
    );
  };
  
  export default Ch7;