ServerEvents.customCommand((event) => {
    var id = event.getId();

    if (id = "blink"){
        blink(event.getEntity(), event.getEntity().server);
    }
    /**
     * 
    * @param {Internal.LivingEntity} entity
    * @param {Internal.MinecraftServer} server
    * @param {string} cmd
    */

    function cmd_as(entity, server, cmd) {
        var id = entity.getProfile().getId().toString();
    
        server.runCommandSilent("execute as "+id+" run "+cmd);
    }
    
    /**
     * 
     * @param {Internal.LivingEntity} sourceEntity
     * @param {Internal.LivingEntity} targetEntity
     * @param {Internal.MinecraftServer} server
     * @param {string} cmd
     */
    function indirect_cmd_at_as(locationEntity, identityEntity, server, cmd){
    
        server.runCommandSilent("execute at " +locationEntity+" as " +identityEntity+ " run " +cmd);
    }
    
    function indirect_cmd_at_at(locationEntity, identityEntity, server, cmd){
        server.runCommandSilent("execute at " +locationEntity+ " at " +identityEntity+ " run " +cmd)
    }
    /**
    * 
    * @param {Internal.LivingEntity} entity
    * @param {Internal.MinecraftServer} server
    */

    function blink(entity, server){
        cmd_as(entity, server, "tp ^ ^ ^5");
    }
})