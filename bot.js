const mineflayer = require('mineflayer');

// Configuration
const SERVER_IP = 'YOUR_SERVER_IP';
const ACCOUNTS = ['Alex_Explorer', 'Steve_The_Builder', 'Miner_Max26'];
let currentAccountIndex = 0;

function runBot() {
  const now = new Date();
  const hour = now.getHours(); // Local hour of your hosting service (e.g., Replit)

  // 1. NIGHT SLEEP LOGIC (Offline between 2 AM and 8 AM)
  if (hour >= 2 && hour < 8) {
    console.log("Night cycle active. Sleeping until 8 AM to avoid detection...");
    setTimeout(runBot, 1800000); // Check again in 30 mins
    return;
  }

  const username = ACCOUNTS[currentAccountIndex];
  console.log(`Starting shift for: ${username}`);

  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: 19132,
    username: username,
    version: '1.20.x' // Update for 2026
  });

  // 2. HUMAN BEHAVIOR (Movement, Looking, Clicking)
  bot.on('spawn', () => {
    console.log(`${username} is now acting human.`);
    
    const behave = () => {
      if (!bot || !bot.entity) return;
      
      // Random Move
      const actions = ['forward', 'back', 'left', 'right', 'jump'];
      const act = actions[Math.floor(Math.random() * actions.length)];
      bot.setControlState(act, true);
      setTimeout(() => bot.setControlState(act, false), 1000);

      // Random Look & Click
      bot.look(Math.random() * 6, Math.random() * 2);
      bot.swingArm('right');

      setTimeout(behave, Math.floor(Math.random() * 15000) + 5000);
    };
    behave();

    // 3. SHIFT ROTATION LOGIC (Switch after 4 hours)
    setTimeout(() => {
      console.log("Shift over. Switching accounts...");
      bot.quit();
    }, 14400000); 
  });

  bot.on('end', () => {
    currentAccountIndex = (currentAccountIndex + 1) % ACCOUNTS.length;
    // Wait 10 mins before next bot joins
    setTimeout(runBot, 600000);
  });

  bot.on('error', (err) => console.log("Error:", err));
}

runBot();
