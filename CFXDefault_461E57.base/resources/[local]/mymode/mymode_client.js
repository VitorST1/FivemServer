const spawnPos = [318.228790,164.457535,103.146561]; 
on('onClientGameTypeStart', () => {
  exports.spawnmanager.setAutoSpawnCallback(() => {
    exports.spawnmanager.spawnPlayer({
      x: spawnPos[0],
      y: spawnPos[1],
      z: spawnPos[2],
      model: 'ig_johnnyklebitz'
    }, () => {
      emit('chat:addMessage', {
        args: [
          'Welcome to the party!~'
        ]
      })
    });
  });

  exports.spawnmanager.setAutoSpawn(true)
  exports.spawnmanager.forceRespawn()
});

Delay = (ms) => new Promise(res => setTimeout(res, ms));

RegisterCommand('car', async (source, args, raw) => {
  // account for the argument not being passed
  let model = "adder";
  if (args.length > 0)
  {
    model = args[0].toString();
  }

  // check if the model actually exists
  const hash = GetHashKey(model);
  if (!IsModelInCdimage(hash) || !IsModelAVehicle(hash))
  {
    emit('chat:addMessage', {
      args: [`It might have been a good thing that you tried to spawn a ${model}. Who even wants their spawning to actually ^*succeed?`]
    });
    return;   
  }

  // Request the model and wait until the game has loaded it
  RequestModel(hash);
  while (!HasModelLoaded(hash))
  {
    await Delay(500);
  }

  const ped = PlayerPedId();

  // Get the coordinates of the player's Ped (their character)
  const coords = GetEntityCoords(ped);

  // Create a vehicle at the player's position
  const vehicle = CreateVehicle(hash, coords[0], coords[1], coords[2], GetEntityHeading(ped), true, false);

  // Set the player into the drivers seat of the vehicle
  SetPedIntoVehicle(ped, vehicle, -1);
  // Allow the game engine to clean up the vehicle and model if needed
  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(model);

  // Tell the player the car spawned
  emit('chat:addMessage', {
    args: [`Woohoo! Enjoy your new ^*${model}!`]
  });
}, false);

RegisterCommand('gun', async (source, args, raw) => {
  // account for the argument not being passed
  let model = "weapon_raycarbine";
  if (args.length > 0)
  {
    model = `weapon_${args[0].toString()}`;
  }

  // check if the model actually exists
  const hash = GetHashKey(model);
  // if (!IsModelValid(hash))
  // {
  //   emit('chat:addMessage', {
  //     args: [`It might have been a good thing that you tried to spawn a ${model}. Who even wants their spawning to actually ^*succeed?`]
  //   });
  //   return;   
  // }

  const ped = PlayerPedId();

  GiveWeaponToPed(ped,hash,500,false,true)
  SetPedInfiniteAmmo(ped,true,hash)

  // Allow the game engine to clean up the vehicle and model if needed
  SetModelAsNoLongerNeeded(model);

  // Tell the player the car spawned
}, false);

RegisterCommand('godmode', async (source, args, raw) => {
  const ped = PlayerPedId();
  // SetEntityMaxHealth(ped,99999999999999)
  // SetEntityHealth(ped,99999999999999)
  SetPedDiesInSinkingVehicle(ped,false)
  SetPedDiesInVehicle(ped,false)
  SetPedDiesInWater(ped,false)
  SetPedDiesWhenInjured(ped,false)
  SetPlayerInvincible(ped,true)
}, false);

RegisterCommand('money', async (source, args, raw) => {
  const ped = PlayerPedId();
  amount = 100000
  emit('chat:addMessage', {
    args: [`args:${args[0].toString()}`]
  });
  if (args.length > 0)
  {
    amount = args[0].toString();
  }
  SetPedMoney(ped,1000)
}, false);

RegisterCommand('cop', async (source,args,raw) =>{
  const ped = PlayerPedId();
  SetPedAsCop(ped,true)
}, false)