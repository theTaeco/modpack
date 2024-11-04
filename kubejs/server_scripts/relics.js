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
    * @param {Internal.LivingEntity} entity
    * @param {Internal.MinecraftServer} server
    */

    function blink(entity, server){
        var id = entity.getProfile().getId().toString();
        entity.tell(id);
        cmd_as(entity, server, "tp ^ ^ ^5");
    }
})