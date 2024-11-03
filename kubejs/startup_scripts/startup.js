StartupEvents.registry('item', e => {

    e.create('voidgazer_spyglass')
    .displayName('Voidgazer Spyglass')
    .texture('relics:item/voidgazer_spyglass')
    .modelJson('relics:model/voidgazer_spyglass')
    .unstackable()
    .rarity('epic')
    .glow(true)
    .useAnimation('crossbow')
    .useDuration(_itemstack => 72000)
    .barColor(_itemstack => Color.DARK_PURPLE)
    .barWidth(_itemstack => 0)
    .use((_level, player, _hand) => {
      player.playSound("minecraft:block.respawn_anchor.charge", 5, 0);
      return true;
    })
    .releaseUsing((itemstack, _level, entity, _tick) => {
      var destination = entity.rayTrace(64, false);
      var destX = destination.getHitX();
      var destY = destination.getHitY();
      var destZ = destination.getHitZ();
      var fuelNeeded = Math.ceil(entity.getDistance(destX, destY, destZ)/4);
      var offhandItem = entity.getOffHandItem();
      var offhandCount = entity.offHandItem.getCount();
      if (offhandItem.getId() == `minecraft:amethyst_shard` && offhandCount > 0 && destination.block != null && fuelNeeded < offhandCount){
        entity.offHandItem.setCount(offhandCount - fuelNeeded);
        entity.teleportTo(destX, destY, destZ);
        entity.playSound("minecraft:entity.warden.sonic_boom", 5, 1);
      }
      else{
        entity.attack(4);
        entity.playSound("minecraft:block.respawn_anchor.deplete", 5, 1);
      }
    });
    e.create('inert_transport_shard')
    .displayName("Inert Transport Shard")
    .texture('runic_shards:item/transport_inert')
    .unstackable()
    .rarity("common")
    .glow(false)
    .tooltip("An inert runic shard, formatted for transport spells.");
    e.create('inert_combat_shard')
    .displayName("Inert Combat Shard")
    .texture('runic_shards:item/combat_inert')
    .unstackable()
    .rarity("common")
    .glow(false)
    .tooltip("An inert runic shard, formatted for combat spells.");
    e.create('inert_conjuring_shard')
    .displayName("Inert Conjuring Shard")
    .texture('runic_shards:item/conjuring_inert')
    .unstackable()
    .rarity("common")
    .glow(false)
    .tooltip("An inert runic shard, formatted for conjuring spells.");
    e.create('inert_utility_shard')
    .displayName("Inert Utility Shard")
    .texture('runic_shards:item/utility_inert')
    .unstackable()
    .rarity("common")
    .glow(false)
    .tooltip("An inert runic shard, formatted for utility spells.");

    e.create('basic_transport_shard')
    .displayName("Basic Transport Shard")
    .texture('runic_shards:item/transport_iron')
    .unstackable()
    .rarity("uncommon")
    .glow(true)
    .maxDamage(4)
    .tooltip("A runic shard, formatted for transport spells.")
    .use((_level, player, _hand) => {
      var itemstack = player.mainHandItem;
      var command = player.mainHandItem.nbt;
      player.tell(command);
      itemstack.damageValue++;
      if (itemstack.damageValue >= itemstack.maxDamage) {
        itemstack.count = itemstack.count - 1;
      }
      return true;
    })

    e.create('antenna').displayName('Antenna').texture('phonos:item/antenna');
    e.create('satellite_dish').displayName('Satellite Dish').texture('phonos:item/dish_antenna');
  })


  