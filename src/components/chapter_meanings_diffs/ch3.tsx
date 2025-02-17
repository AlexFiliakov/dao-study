const Ch3 = () => {
    return (
      <div>
        <h3 className="font-bold">Key Differences and Their Implications:</h3>
        <ol style={{ listStyleType: 'decimal', paddingLeft: '1rem' }}>
            <li><strong className="font-semibold">"使民心不乱" vs. "使心不乱"</strong></li>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>Guodian/Mawangdui: "Do not show them things to desire, and this makes the people’s hearts not become chaotic."</li>
                <li>Standard text: "Do not show them things to desire, and this makes the heart not become chaotic."</li>
                <li><strong className="font-semibold">Implication:</strong></li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>The older text (Guodian/Mawangdui) explicitly refers to 民心 (mín xīn, "the hearts of the people"), emphasizing the collective emotional state of society.</li>
                    <li>The later standard text generalizes this to 心 (xīn, "heart/mind"), which could be interpreted more broadly as referring to individual or universal mental states.</li>
                </ul>
                <li><strong className="font-semibold">Philosophical Shift:</strong></li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>Earlier text: The focus is on governance, emphasizing how the people as a whole respond to external desires.</li>
                    <li>Later text: The focus becomes more internal and abstract, aligning more with personal cultivation of tranquility rather than a societal perspective.</li>
                </ul>
            </ul>
            <li><strong className="font-semibold">"智者" vs. "知者"</strong></li>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>Guodian/Mawangdui: "So that the wise (智者, zhì zhě) do not dare to act."</li>
                <li>Standard text: "So that the knowledgeable (知者, zhī zhě) do not dare to act."</li>
                <li><strong className="font-semibold">Implication:</strong></li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>智者 (zhì zhě) refers to those with wisdom, typically meaning people who possess deep insight, strategic thinking, or philosophical understanding.</li>
                    <li>知者 (zhī zhě) refers to those who merely "know" something, implying a broader category of learned individuals, intellectuals, or scholars rather than truly wise sages.</li>
                </ul>
                <li><strong className="font-semibold">Philosophical Shift:</strong></li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>Older text (Guodian/Mawangdui): Suggests that truly wise individuals should refrain from manipulating society.</li>
                    <li>Later text: Suggests that those who have knowledge (but not necessarily wisdom) should not interfere.</li>
                    <li>This softens the critique of wisdom in governance and shifts the focus from wisdom itself to mere intellectualism or strategic thinking.</li>
                </ul>
            </ul>
        </ol>
        <h3 className="font-bold mt-2">Final Interpretation:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
            <li>The Guodian/Mawangdui version is more political and focused on society as a whole:</li>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>It suggests that controlling public desires ensures a harmonious society.</li>
                <li>It is wary of wise rulers who might try to shape society through their wisdom.</li>
            </ul>
        </ul>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
            <li>The later standard text shifts toward individual psychology and self-cultivation:</li>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>It removes the explicit reference to "the people's hearts", making the passage more generalized.</li>
                <li>It softens the critique of wisdom, instead warning against intellectual interference.</li>
                <li>Both versions emphasize governing through simplicity, reducing desires, and letting nature take its course, but the older version is more about society-wide effects, while the later version is more abstract and individualistic.</li>
            </ul>
        </ul>
      </div>
    );
  };
  
  export default Ch3;