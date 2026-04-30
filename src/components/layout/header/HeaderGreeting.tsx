import Heading from '../../shared/Heading';

function HeaderGreeting() {
  const date = new Date();

  const getGreeting = () => {
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
      return { greeting: 'Good morning', emoji: '🌅' };
    } else if (hour >= 12 && hour < 17) {
      return { greeting: 'Good afternoon', emoji: '☀️' };
    } else if (hour >= 17 && hour < 21) {
      return { greeting: 'Good evening', emoji: '🌙' };
    } else {
      return { greeting: 'Good night', emoji: '⭐' };
    }
  };

  const { greeting, emoji } = getGreeting();

  const weekday = date.toLocaleDateString('en-GB', {
    weekday: 'long',
  });
  const dayMonth = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });

  const formattedDate = `${weekday}, ${dayMonth}`;

  return (
    <div className="flex flex-col gap-sm">
      <Heading as="h2" className="font-semibold text-lg md:text-xl">
        {greeting}, Admin! {emoji}
      </Heading>

      <p className="text-sm text-muted-foreground">{formattedDate}</p>
    </div>
  );
}

export default HeaderGreeting;
