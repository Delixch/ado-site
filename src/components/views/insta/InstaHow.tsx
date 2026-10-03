import { useState } from 'react';
import { useView } from '../../ViewFrame';
import { InstaFeatures } from './InstaFeatures';
import { InstaFlow } from './InstaFlow';
import { InstaProcess } from './InstaProcess';

const VIEWS = [InstaFlow, InstaFeatures, InstaProcess];

/** So funktioniert's: drei Ansichten hinter Reitern im Seitenkopf - eine Seite, kein langes Scrollen. */
export function InstaHow() {
  const { t } = useView();
  const f = t.i.flow;
  const labels = [f.stepsTitle, t.i.features.tab, t.i.process.tab];
  const [tab, setTab] = useState(0);
  const View = VIEWS[tab];

  const tabs = (
    <div className="how-tabs" role="tablist">
      {labels.map((label, i) => (
        <button key={label} type="button" role="tab" aria-selected={i === tab} className="how-tab" onClick={() => setTab(i)}>
          {label}
        </button>
      ))}
    </div>
  );

  return <View key={tab} tabs={tabs} />;
}
