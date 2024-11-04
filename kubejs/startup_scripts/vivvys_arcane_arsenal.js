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

/** * 
    * @param {Internal.LivingEntity} entity
    * @param {Internal.MinecraftServer} server
    * @param {Internal.Level} level
    */

    const useTransport = (_itemstack, entity, _level) => {
      var itemstack = entity.getMainHandItem();
      var nbt = itemstack.getNbt();
      var spell = nbt.getString("Spell");
      player.runCommandSilent("kubejs custom_command " +spell);

      entity.tell(spell);
      entity.tell(itemstack.getDamageValue());
      entity.tell(itemstack.getMaxDamage());
      entity.addItemCooldown(entity.mainHandItem, 20);
      itemstack.hurtAndBreak(1, player, (p) => { p.broadcastBreakEvent("MAIN_HAND") });
      return true;
    }

    e.create('basic_transport_shard')
      .formattedDisplayName(Component.string("Basic Transport Shard").lightPurple())
      .texture('runic_shards:item/transport_iron')
      .unstackable()
      .glow(true)
      .maxDamage(4)
      .barColor(_itemstack => Color.LIGHT_PURPLE)
      .barWidth(_itemstack => 13 - Math.ceil(3.25 * _itemstack.damageValue))
      .tooltip("A runic shard, formatted for transport spells.")
      .useDuration(_itemstack => 72000)
      .use((_level, player, _hand) => {
        player.playSound("item.lodestone_compass.lock", 5, 1);
        return true;
      })
      .releaseUsing((_itemstack, _level, player, _tick) => {
        useTransport(_itemstack, player, _level);
      });
})


  