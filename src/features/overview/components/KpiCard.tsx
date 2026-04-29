import Currency from '@/components/shared/Currency';
import Icon from '@/components/shared/Icon';
import type { KpiCardType } from '../types';

type KpiCardProps = {
  stat: KpiCardType;
};

function KpiCard({ stat }: KpiCardProps) {
  const { title, icon, value, amount, details, colors } = stat;

  return (
    <article
      className="flex flex-col gap-base h-full p-md rounded-md overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold" style={{ color: colors.primary }}>
            {title}
          </h2>

          <Icon name={icon} size="26" style={{ color: colors.secondary }} />
        </div>

        <div className={`font-bold text-3xl`} style={{ color: colors.primary }}>
          {amount ? (
            <div className="flex items-center gap-xs">
              <Currency symbol />
              {amount.toLocaleString()}
            </div>
          ) : (
            value
          )}
        </div>

        <div>
          {details &&
            details?.map((detail) => (
              <div
                key={detail.id}
                className="flex items-center gap-sm text-sm"
                style={{ color: colors.primary }}
              >
                <p>{detail.title}:</p>

                <p>
                  {detail.amount ? (
                    <span className="flex items-center gap-xs">
                      <Currency symbol /> {detail.amount.toLocaleString()}
                    </span>
                  ) : (
                    <span className="flex items-center gap-xs">
                      {detail.value}
                    </span>
                  )}
                </p>
              </div>
            ))}
        </div>
      </div>
    </article>
  );
}

export default KpiCard;
