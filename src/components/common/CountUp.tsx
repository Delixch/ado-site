import { useCountUp } from '../../hooks/useCountUp';

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useCountUp(value);
  return (
    <>
      <span ref={ref}>0</span>
      {suffix}
    </>
  );
}
