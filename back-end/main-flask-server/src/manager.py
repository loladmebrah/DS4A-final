import docker
import socket
import random

class ContainerManager:

    def __init__(self, id_length=6):
        self.container_list = []
        self.id_length=id_length
        self.docker_client = docker.from_env()
        self.IMAGE_NAME = 'python'
        self.NETWORK_NAME = 'JC-232'

        # Brings the image to the current context
        print("* Pulling python image...")
        if not self.exists_image():
            self.docker_client.images.pull('python')
        print("* Image succesfully pulled!")

        # Check if the network exists

        # Configures the local network
        print("* Configuring local network...")
        if not self.exists_network():
            self.docker_client.networks.create(self.NETWORK_NAME)
        print("* Local network successfully configured")
    
    def exists_network(self):
        for network in self.docker_client.networks.list():
            if network.name == self.NETWORK_NAME:
                return True

        return False
    
    def exists_image(self):
        for image in self.docker_client.images.list():
            for tag in image.tags:
                if self.IMAGE_NAME in tag:
                    return True
        
        return False

    def get_unique_id(self, max_tries=1000):
        """
        Returns an unique code made by self.id_length digits.
        If it doesn't get a valid code after max_tries runs,
        an Exception is raised.

        WARNINGS: 
            - When len(container_list) gets too close to 
            10^(id_length), this function may turn slow.

        """
        # The code to be returned.
        id = ''

        for _ in range(max_tries):
            
            # Crea un string aleatorio de numeros con tantos digitos como id_length
            id = "{:04d}".format(random.randrange(10**(self.id_length)))

            # Verifica si es unico en el contexto actual
            if not self.exists_code(id):
                return id
        
        raise Exception("Max number of tries reached.")
    
    def create_container(self, code):
        """
        Create a container with the specified code as the container name.
        If the code exists in the self.container_list, then the container
        will not be created and an exception will be raised.
        """

        if not self.exists_code(code):
            # Create a container 
            container = self.docker_client.containers.create(
                self.IMAGE_NAME,
                name=code,
                network=self.NETWORK_NAME,
                labels={'net-id': self.NETWORK_NAME})

            container.start()
            print(container.labels)
            self.container_list.append(container)
            print("Container created with name: {} on network: {}".format(container.name, self.NETWORK_NAME))

        else:
            raise Exception("Code {} for container already exists".format(code))
        
    def prune(self):
        """
        Removes all the containers from self.container_list

        WARNING: NO FILTER IS APPLIED
        """
        pruned = self.docker_client.containers.prune()

        for key, value in pruned.items():
            print("Pruned: {} - {}".format(key, value))

        
    
    def exists_code(self, code):
        """
        Returns Flase if the code doesn't match any of the container's names, True otherwise
        """
        for container in self.container_list:
            name = container.name
            if code == name:
                return True
        return False



