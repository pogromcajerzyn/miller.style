import os
from ftplib import FTP
from configparser import ConfigParser


def load_config(config_file='config.ini'):
    config = ConfigParser()
    config.read(config_file)
    return config


def upload_files_ftp(local_dir, ftp_server, ftp_username, ftp_password, ftp_directory):
    ftp = FTP()
    ftp.connect(ftp_server)
    ftp.login(user=ftp_username, passwd=ftp_password)

    # Set transfer mode to binary
    ftp.voidcmd('TYPE I')

    def should_ignore_item(item_name):
        # List of items to ignore
        ignore_items = [".gitignore", "config.ini", "main.py", "poetry.lock", "push.py", "pyproject.toml"]
        return item_name in ignore_items

    def should_ignore_folder(folder_name):
        # List of folders to ignore
        ignore_folders = [".git", ".idea", ".venv"]
        return folder_name in ignore_folders

    def upload_recursive(local_path, remote_path):
        for filename in os.listdir(local_path):
            local_file_path = os.path.join(local_path, filename)
            remote_file_path = os.path.join(remote_path, filename).replace("\\", "/")

            if os.path.isfile(local_file_path):
                # Check if the file should be ignored
                if should_ignore_item(filename):
                    print(f"Ignoring file: {local_file_path}")
                else:
                    try:
                        # Check if the file already exists on the FTP server
                        ftp.size(remote_file_path)  # Attempt to get file size (may raise error)
                        remote_file_size = ftp.size(remote_file_path)
                        local_file_size = os.path.getsize(local_file_path)

                        if remote_file_size == local_file_size:
                            print(f"Skipped: {remote_file_path} (File already exists and has the same size)")
                        else:
                            # If file sizes are different, assume it's a different version and overwrite
                            with open(local_file_path, 'rb') as file:
                                ftp.storbinary(f"STOR {remote_file_path}", file)
                            print(f"Overwritten: {remote_file_path}")

                    except Exception as e:
                        # File does not exist on the FTP server, upload it
                        with open(local_file_path, 'rb') as file:
                            ftp.storbinary(f"STOR {remote_file_path}", file)
                        print(f"Sent: {remote_file_path}")

            elif os.path.isdir(local_file_path):
                # Check if the folder should be ignored
                if should_ignore_folder(filename):
                    print(f"Ignoring folder: {local_file_path}")
                else:
                    # Recursively upload files in subdirectories
                    try:
                        ftp.mkd(remote_file_path)
                    except:
                        pass  # Directory already exists

                    upload_recursive(local_file_path, remote_file_path)

    # Upload files from the root directory
    root_local_path = local_dir
    root_remote_path = ftp_directory.replace("\\", "/")
    upload_recursive(root_local_path, root_remote_path)

    ftp.quit()


if __name__ == "__main__":
    print("pushing to FTP")
    config_file = os.path.join(os.path.dirname(__file__), 'config.ini')
    config = load_config(config_file)

    host = config.get('MILLER_FTP', 'host')
    port = config.getint('MILLER_FTP', 'port')
    username = config.get('MILLER_FTP', 'username')
    password = config.get('MILLER_FTP', 'password')
    local_path = os.path.join(os.path.dirname(__file__), config.get('MILLER_FTP', 'local_dir'))

    upload_files_ftp(local_path, host, username, password, "")
