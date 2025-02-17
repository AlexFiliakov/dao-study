const Ch17 = () => {
    return (
        <div>
            <h3 className="font-bold">Key Differences and Their Implications:</h3>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '1rem' }}>
                <li><strong className="font-semibold">"不知有之" vs. "下知有之"</strong></li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>Guodian/Mawangdui: "The best leader is barely known to the people."</li>
                    <li>Standard text: "The best leader is known by the people below."</li>
                    <li><strong className="font-semibold">Implication:</strong></li>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        <li>The older text (Guodian/Mawangdui) suggests a more detached approach to leadership, where the leader’s presence is minimal or barely felt.</li>
                        <li>The later standard text implies a hierarchical structure where the leader is recognized or known by those beneath them, perhaps indicating some level of active presence or acknowledgment.</li>
                    </ul>
                    <li><strong className="font-semibold">Philosophical Shift:</strong></li>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        <li>Earlier text: Emphasizes an almost invisible governance where the leader does not draw attention to themselves.</li>
                        <li>Later text: Acknowledges a leader’s role within a hierarchical society, possibly emphasizing their relational role.</li>
                    </ul>
                </ul>
                <li><strong className="font-semibold">"信不足焉，有不信焉" vs. "信不足，焉有不信焉"</strong></li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>Guodian/Mawangdui: "When trust is insufficient, there is no trust."</li>
                    <li>Standard text: "When there is not enough trust, there is distrust."</li>
                    <li><strong className="font-semibold">Implication:</strong></li>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        <li>The older text emphasizes the self-fulfilling nature of trust; without trust, trust cannot exist, implying a fundamental lacking.</li>
                        <li>The later text suggests a direct causality from lack of trust to the presence of distrust, focusing on the relationship between these concepts.</li>
                    </ul>
                    <li><strong className="font-semibold">Philosophical Shift:</strong></li>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                        <li>Older text: Highlights an existential state where the absence of trust negates its possibility.</li>
                        <li>Later text: Focuses on the practical consequences of a lack of trust, underlining social dynamics.</li>
                    </ul>
                </ul>
            </ol>
            <h3 className="font-bold mt-2">Final Interpretation:</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>The Guodian/Mawangdui version is centered on minimalistic governance and intrinsic qualities of trust:</li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>Emphasizes a leadership style that is unobtrusive and harmonizes with the natural order.</li>
                    <li>Focuses on the foundational aspect of trust as a precondition for its manifestation.</li>
                </ul>
            </ul>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                <li>The later standard text focuses more on hierarchy and governance dynamics:</li>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
                    <li>Recognizes the leader's position within a hierarchy, suggesting some level of involvement or interaction with those below.</li>
                    <li>Concentrates on the social implications of a lack of trust, indicating a direct relationship between the absence of trust and arising distrust.</li>
                </ul>
            </ul>
        </div>
    );
  };
  
  export default Ch17;