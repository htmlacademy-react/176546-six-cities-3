import clsx from 'clsx';
import { USER_BADGE_CLASSES } from '@/components/user-badge/const';
import type { UserBadgeVariant } from '@/components/user-badge/const';
import type { HostInfo } from '@/types/host';

type UserBadgeProps = {
  user: HostInfo;
  variant: UserBadgeVariant;
};

function UserBadge({ user, variant }: UserBadgeProps): JSX.Element {
  const classes = USER_BADGE_CLASSES[variant];
  const alt = variant === 'offer' ? 'Host avatar' : `${user.name} avatar`;

  return (
    <div className={classes.container}>
      <div className={clsx(classes.wrapper, { [classes.wrapperPro]: user.isPro })}>
        <img
          className={classes.image}
          src={user.avatarUrl}
          width={classes.size}
          height={classes.size}
          alt={alt}
        />
      </div>
      <span className={classes.name}>{user.name}</span>
      {user.isPro && <span className={classes.status}>Pro</span>}
    </div>
  );
}

export default UserBadge;
