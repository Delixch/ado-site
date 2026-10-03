import { useView } from '../../ViewFrame';
import { useHowTab } from './howTab';
import { InstaFeatures } from './InstaFeatures';
import { InstaFlow } from './InstaFlow';
import { InstaPricing } from './InstaPricing';
import { InstaProcess } from './InstaProcess';

const VIEWS = [InstaFlow, InstaFeatures, InstaProcess, InstaPricing];

/** So funktioniert's: vier Ansichten hinter Reitern (wie Tabellenzeilen) - eine Seite statt vier. */
export function InstaHow() {
  const { t } = useView();
  const labels = [t.i.flow.stepsTitle, t.i.features.tab, t.i.process.tab, t.i.pricing.eyebrow];
  const [tab, setTab] = useHowTab('i-flow');

  const View = VIEWS[tab] ?? InstaFlow;

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
