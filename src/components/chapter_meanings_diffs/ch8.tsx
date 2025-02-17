const Ch8 = () => {
    return (
      <div>
        <h3 className="font-bold">Key Differences and Their Implications:</h3>
        <ol style={{ listStyleType: 'decimal', paddingLeft: '1rem' }}>
          <li><strong className="font-semibold">"处众人之所恶" vs. "处衆人之所恶"</strong></li>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
            <li>Guodian/Mawangdui: "Residing where the people (众人, zhòng rén) despise."</li>
            <li>Standard text: "Residing where the crowd (衆人, zhòng rén) despise."</li>
            <li><strong className="font-semibold">Implication:</strong></li>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>众 (zhòng) and 衆 (zhòng) were historically interchangeable, both meaning "many people" or "the masses."</li>
              <li>By the Three Kingdoms period, 衆 was the more standardized version in literary use.</li>
            </ul>
            <li><strong className="font-semibold">Philosophical Shift:</strong></li>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>No significant change in meaning, but later standardization of terminology shows evolving written conventions.</li>
              <li>The meaning remains that water seeks the lowest places, just as the sage aligns with the humble and unwanted spaces of the world.</li>
            </ul>
          </ul>

          <li><strong className="font-semibold">Punctuation and Structural Differences</strong></li>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
            <li>Guodian/Mawangdui text has a more fluid structure, lacking the full stop after "水善利万物而不争" ("Water benefits all things but does not compete").</li>
            <li>Standard text breaks this idea more explicitly, reinforcing the structural flow of the sentence.</li>
            <li><strong className="font-semibold">Implication:</strong></li>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
              <li>The earlier text flows in a continuous thought, emphasizing natural movement and spontaneity.</li>
              <li>The later text presents a clearer separation of ideas, reinforcing its didactic nature as a teaching text.</li>
            </ul>
          </ul>
        </ol>

        <h3 className="font-bold mt-2">Final Interpretation:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
          <li>The Guodian/Mawangdui version is slightly more naturalistic and fluid, aligning with an early oral tradition:</li>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
            <li>Its lack of rigid structure suggests a freer, poetic quality, emphasizing the effortless movement of Dao.</li>
            <li>The choice of "众人" instead of "衆人" reflects an earlier written form, without affecting meaning.</li>
          </ul>
        </ul>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
          <li>The later standard text is more formally structured and didactic:</li>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>
            <li>It reinforces the wisdom of the sage as a teaching rather than leaving it as an observational statement.</li>
            <li>By breaking the sentence more clearly, it emphasizes distinct moral lessons rather than natural descriptions.</li>
          </ul>
        </ul>
      </div>
    );
  };
  
  export default Ch8;